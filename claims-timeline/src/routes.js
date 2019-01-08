import policyDisplay from "./components/policyDisplay";
import claimDisplay from "./components/claimDisplay";
import home from "./components/home";
import createPolicy from "./components/createPolicy";

export default [
  { path: "/", component: home },
  { path: "/policy/:id", component: policyDisplay },
  { path: "/claim/:id", component: claimDisplay },
  { path: "/new_policy", component: createPolicy }
];
