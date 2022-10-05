<script>
import { defineComponent, h } from 'vue';

export default {
  inject: ['instance'],

  render() {
    const { instance } = this;
    const placeholderClass = {
      'vue-treeselect__placeholder': true,
      'vue-treeselect-helper-zoom-effect-off': true,
      'vue-treeselect-helper-hide': instance.hasValue || instance.trigger.searchQuery,
    };

    return (
      h('div', { class: placeholderClass }, instance.placeholder)
    );
  },
};
</script>
