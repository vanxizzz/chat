import {
  Button,
  Form,
  FormItem,
  Row,
  Col,
  Input,
  Checkbox,
  CheckboxGroup,
  Dialog,
  Upload,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Avatar
} from "element-ui";
// import ScrolllBar from "element-ui/packages/scrollbar";
// import 'vue-happy-scroll/docs/happy-scroll.css';
// import HappyScroll from 'vue-happy-scroll';
import VueCustomScrollbar from "vue-custom-scrollbar/src/main"
export default (Vue) => {

  Vue.use(Upload);
  Vue.use(Dialog);
  Vue.use(Checkbox);
  Vue.use(CheckboxGroup);
  Vue.use(Input);
  Vue.use(Button);
  Vue.use(Form);
  Vue.use(FormItem);
  Vue.use(Row);
  Vue.use(Col);
  Vue.component("vue-custom-scrollbar", VueCustomScrollbar);
  // Vue.use(ScrolllBar);
  // Vue.use(HappyScroll)
}