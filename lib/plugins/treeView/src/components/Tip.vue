<script>
import { defineComponent, h } from 'vue';

export default defineComponent({
  functional: true,

  props: {
    type: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
  },

  render() {
    const { type, icon } = this;

    return (
      h('div', {
        class: `vue-treeselect__tip vue-treeselect__${type}-tip`,
      }, [
        h('div', {
          class: 'vue-treeselect__icon-container',
        }, [
          h('span', { class: `vue-treeselect__icon-${icon}` }),
        ]),

        h('span', {
          class: `vue-treeselect__tip-text vue-treeselect__${type}-tip-text`,
        }, [
          this.$slots.default(),
        ]),
      ])
    );
  },
});
</script>
