<script>
import { h } from 'vue';
import Input from './Input.vue';
import Placeholder from './Placeholder.vue';

export default {
  inject: ['instance'],
  methods: {
    renderSingleValueLabel() {
      const { instance } = this;
      const node = instance.selectedNodes[0];

      const customValueLabelRenderer = instance.$slots['value-label'];
      return customValueLabelRenderer
        ? customValueLabelRenderer({ node })
        : node.label;
    },
  },
  render() {
    const { instance, $parent: { renderValueContainer } } = this;
    const shouldShowValue = instance.hasValue && !instance.trigger.searchQuery;

    return renderValueContainer([
      shouldShowValue && (
        h('div', { class: 'vue-treeselect__single-value' }, [this.renderSingleValueLabel()])
      ),
      h(Placeholder),
      h(Input, { ref: 'input' }),
    ]);
  },
};
</script>
