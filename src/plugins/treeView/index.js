import TreeSelect from './src/components/Treeselect.vue';
import treeselectMixin from './src/mixins/treeselectMixin';
import './styles/style.less';

export default TreeSelect;
export { TreeSelect, treeselectMixin };
export {
  // Delayed loading.
  LOAD_ROOT_OPTIONS,
  LOAD_CHILDREN_OPTIONS,
  ASYNC_SEARCH,
} from './src/constants';
