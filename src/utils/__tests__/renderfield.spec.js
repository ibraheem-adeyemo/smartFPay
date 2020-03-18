import renderField from "../renderfield";

import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    input: {},
    id: "name",
    placeholder: "name",
    type: "text",
    disabled: true,
    meta: { touched: false, error: null }
  };
  const enzymeWrapper = shallow(<renderField {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Render field", () => {
    it("To match snapshot", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper.find("div"));
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
