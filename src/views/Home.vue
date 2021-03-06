// @flow
<template>
  <div class="home elevation-02" v-hotkey.stop="keymap">
    <div class="side-by-side d-flex flex-row">
      <pc-left-sidebar v-if="is_panel_visible('main.sidebar')"></pc-left-sidebar>
      <div class="right-content w-100">
        <div class="widgets-container sticky-top">
          <pc-toolbar-surface v-if="is_panel_visible('toolbar.surface')"></pc-toolbar-surface>
          <pc-status-bar v-if="is_panel_visible('main.filename')"/>
        </div>
        <pc-tabbed-editor></pc-tabbed-editor>
        <pc-stack-frames v-if="is_panel_visible('main.stack-frames')"/>
        <pc-ignored-files v-if="is_panel_visible('main.ignored_files')"></pc-ignored-files>
      </div>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {mapState, mapActions, mapGetters, mapMutations} from 'vuex'
  import PcTabbedEditor from './code/tabbed-editor.component'
  import PcClientConnections from './widgets/client-connections.component'
  import PcStatusBar from './code/top-status-bar.component'
  import PcToolbarSurface from './toolbars/toolbar-surface.component'
  import PcLeftSidebar from './left-sidebar/left.sidebar.component'
  import PcIgnoredFiles from './ignored-files.component'
  import PcStackFrames from './webgl-graph/PcStackFrames'
  import {EventBus} from '../shared/event-bus'

  const browserTitle = 'PyCrunch Tracing'

  export default {
    name: 'Home',
    metaInfo () {
      // DO NOT Move this inside arrow function, as reactive updates will not work
      let session_name = null
      if (this.current_session) {
        session_name = this.current_session.name
      }
      return {
        titleTemplate: () => {
          return session_name ? `${session_name} | ${browserTitle}` : browserTitle
        },
      }
    },
    components: {
      PcStackFrames,
      PcIgnoredFiles,
      PcToolbarSurface,
      PcTabbedEditor,
      PcLeftSidebar,
      PcStatusBar,
    },
    data () {
      return {
        slider_position: 1
      }
    },
    mounted (): void {
      EventBus.$on('trace_load_will_fail', payload => {
        this.$notify.error("Failed to load trace " + payload)
      });
      this.arrow_keys_will_become_disabled()
      let rq = this.$route.query
      if (rq.open) {
        // if (rq.open === 'v0.1-interactive-demo') {
        this.open_remote_recording(rq.open)
        // }
      }
    },
    methods: {
      ...mapActions([
        'set_selected_index',
        'debug_previous_line',
        'debug_next_line',
        'step_over',
        'step_back_over',
        'step_back_out',
        'step_out_backwards',
        'step_out_forward',
        'will_open_local_trace',
        'open_remote_recording'
      ]),
      ...mapMutations(['selected_index_will_change','will_toggle_ui_panel', 'toggle_ui_follow_cursor']),

      buttonWillClick () {
      },

      arrow_keys_will_become_disabled () {
        Mousetrap.bind(['down', 'up'], function() {
          return false
        });
      }
    },
    computed: {
      ...mapGetters(['total_events','is_panel_visible']),
      ...mapState(['x', 'current_session', 'selected_event',  'is_connected']),
      keymap () {
        return {
          'left': this.debug_previous_line,
          'right': this.debug_next_line,
          'up': this.step_back_over,
          'shift+up': this.step_out_backwards,
          'shift+down': this.step_out_forward,
          'down': this.step_over,
          'g' : () => this.will_toggle_ui_panel('main.stack-frames'),
          'shift+g' : () => this.will_toggle_ui_panel('stack-graph.tooltip'),
          'shift+s' : () => this.will_toggle_ui_panel('main.sidebar'),
          'shift+i' : () => this.will_toggle_ui_panel('main.ignored_files'),
          'shift+o' : () => EventBus.$emit('user_will_open_file', {}),
          's' : () => this.will_toggle_ui_panel('inspector.stack'),
          'i' : () => this.will_toggle_ui_panel('widgets.inspector'),
          'v' : () => this.will_toggle_ui_panel('inspector.variables'),
          'f' : () => this.toggle_ui_follow_cursor(),
          'r': () => this.will_toggle_ui_panel('stack-graph.render_stats'),

        }
      }
    },

  }
</script>
<style scoped>

  .canvas__container {
    width: 100%;
    height: 60vh;
    display: block;
  }
</style>