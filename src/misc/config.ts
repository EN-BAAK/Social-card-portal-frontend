import * as Yup from "yup";
import { Customer } from "./types";

export const languages = [
  { id: "ar", value: "ar", label: "Arabic" },
  { id: "en", value: "en", label: "English" },
  { id: "he", value: "he", label: "Hebrew" },
];

export const templates = [
  { id: "template1", value: "A", label: "Template 1" },
  { id: "template2", value: "B", label: "Template 2" },
];

export const validationCustomerSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  domain_name: Yup.string().required("Domain name is required"),
  desc: Yup.string().required("Description is required"),
  show_background_img: Yup.boolean(),
  language: Yup.string().required("Language is required"),
  template_type: Yup.string().required("Template type is required"),
});

export const initialCustomerValue: Customer = {
  name: "",
  domain_name: "",
  desc: "",
  desc_color: "#000",
  logo: "",
  show_background_img: false,
  background_img: "",
  text_color: "#000",
  background_color_1: "#000",
  background_color_2: "#000",
  button_color: "#000",
  language: "",
  template_type: "",
  links: [],
};

export const validationMediaSchema = Yup.object({
  name_ar: Yup.string().required("Arabic name is required"),
  name_he: Yup.string().required("Hebrew name is required"),
  name_en: Yup.string().required("English name is required"),
});
