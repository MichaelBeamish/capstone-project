import policyDisplay from "./components/policyDisplay";
import claimDisplay from "./components/claimDisplay";
import home from "./components/home";
import createPolicy from "./components/createPolicy";
import editPolicy from "./components/editPolicy";
import createClaim from "./components/createClaim";
import editClaim from "./components/editClaim";
import about from "./components/about";
import faq from "./components/faq";
import contact from "./components/contact";

export default [
  { path: "/", component: home },
  { path: "/policy/:id", component: policyDisplay },
  { path: "/claim/:id", component: claimDisplay },
  { path: "/new_policy", component: createPolicy },
  { path: "/edit_policy", component: editPolicy },
  { path: "/new_claim", component: createClaim },
  { path: "/edit_claim", component: editClaim },
  { path: "/about", component: about },
  { path: "/faq", component: faq },
  { path: "/contact", component: contact }
];
