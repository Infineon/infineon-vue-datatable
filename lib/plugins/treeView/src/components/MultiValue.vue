<script>
import { defineComponent, h } from 'vue';
import MultiValueItem from './MultiValueItem.vue';
import Input from './Input.vue';
import Placeholder from './Placeholder.vue';

export default {
  inject: ['instance'],

  methods: {
    renderMultiValueItems() {
      const { instance } = this;

      return instance.internalValue
        .slice(0, instance.limit)
        .map(instance.getNode)
        .map((node) => (
          h(MultiValueItem, { key: `multi-value-item-${node.id}`, node })));
    },

    renderExceedLimitTip() {
      const { instance } = this;
      const count = instance.internalValue.length - instance.limit;

      if (count <= 0) return null;

      return (
        h('div', { class: 'vue-treeselect__limit-tip vue-treeselect-helper-zoom-effect-off', key: 'exceed-limit-tip' }, [
          h('span', { class: 'vue-treeselect__limit-tip-text' }, [instance.limitText(count)]),
        ])
      );
    },
  },

  render() {
    const { renderValueContainer } = this.$parent;
    // const transitionGroupProps = {
    //   props: {
    //     tag: 'div',
    //     name: 'vue-treeselect__multi-value-item--transition',
    //     appear: true,
    //   },
    // }

    return renderValueContainer(
      h('transition-group', {
        class: 'vue-treeselect__multi-value',
        tag: 'div',
        name: 'vue-treeselect__multi-value-item--transition',
        appear: true,
      }, [
        this.renderMultiValueItems(),
        this.renderExceedLimitTip(),
        h(Placeholder, { key: 'placeholder' }),
        h(Input, { ref: 'input', key: 'input' }),
      ]),
    );
  },
};
</script>
