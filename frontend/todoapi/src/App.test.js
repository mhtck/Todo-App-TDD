/* eslint-disable jest/valid-expect */

import { render, screen } from "@testing-library/react";
import App from "./App";
import { Table, Icon, Button, TextArea } from "semantic-ui-react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Todo App Test Driver Deployment", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  test("tests of page fields", () => {
    // Sayfamızda 3 alana (texarea, buton ve list) ihtiyacımız var.
    // bu alanlarımızın oluşması için testler yapıyoruz

    //textarea diye bir alanımız varmı?
    expect(wrapper.containsAllMatchingElements([<TextArea />])).toEqual(true);

    //button alanımız varmı ?
    expect(
      wrapper.containsAllMatchingElements([<Button>Create</Button>])
    ).toEqual(true);
  });

  //buton tıklandığında metnin gönderilmesi
  test("submit button onClick event test", () => {
    wrapper
      .find("TextArea")
      .simulate("change", { target: { value: "Yeni todo" } });

    expect(wrapper.state("currentTodo")).toEqual("Yeni todo");
  });

  //yeni todo nun liste eklenmesi
  test("todo table list test", () => {
    wrapper
      .find("TextArea")
      .simulate("change", { target: { value: "Yeni todo" } });

    const table = wrapper.find('Table');
    //Sayfamızda bir tablo olmasını bekliyoruz
    expect(table).toHaveLength(1);

    const tbody = table.find('Body');

    const row = tbody.find('Row');

    row.forEach((tr) => {
      const cells = tr.find('Cell');
      expect(cells.at(0).text()).toEqual('Yeni todo');
    });


  });
});
