export type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

export type variant = "info" | "danger" | "warning" | "secondary";

export type Warning = {
  message: string;
  btn1: string;
  btn2: string;
  styleBtn1?: variant;
  styleBtn2?: variant;
  handleBtn2: () => void;
};

export type AppContext = {
  isLoggedIn: boolean;
  showToast: (toastMessage: ToastMessage) => void;
  showWarning: (warning: Warning) => void;
  medias: Media[];
  fetchMedias: () => Promise<void>;
  customers: CustomerViewData[];
  fetchCustomers: () => Promise<void>;
};

export type Login = {
  phone: string;
  password: string;
};

export type EditPhoneNumber = {
  phone: string;
  newPhone: string;
  password: string;
};

export type EditPassword = {
  phone: string;
  password: string;
  newPassword: string;
};

export type Media = {
  id: number;
  name_en: string;
  name_ar: string;
  show_link: boolean;
  img: string;
};

export type MediaForm = {
  name_en: string;
  name_ar: string;
  show_link?: boolean;
};

export type CustomerViewData = {
  id: number;
  name: string;
  domain_name: string;
  desc: string;
};

export type Link = {
  mediaId: number;
  link: string;
};

export type Customer = {
  name: string;
  domain_name: string;
  desc: string;
  desc_color: string;
  logo?: string;
  show_background_img: boolean;
  background_img?: string;
  text_color: string;
  background_color_1: string;
  background_color_2: string;
  button_color: string;
  language: "ar" | "en" | "";
  template_type: string;
  links: Link[];
};

export type CustomerCard = {
  name: string;
  desc: string;
  desc_color: string;
  logo: string;
  background_img?: string;
  show_background_img: boolean;
  text_color: string;
  background_color_1: string;
  background_color_2: string;
  button_color: string;
  template_type: string;
};

export type LinkCard = {
  link: string;
  SocialMedia: {
    id: number;
    img: string;
    name: string;
    show_link?: boolean;
  };
};

export type Company = {
  company_name: string;
  link: string;
};
