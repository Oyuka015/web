const STORAGE_KEY = "lp-lang";

const translations = {
  mn: {
    langName: "Монгол",
    headerCart: "Сагс",
    headerSave: "Таалагдсан",
    headerProfile: "Хувийн мэдээлэл",
    homeCategory: "Ангилал",
    homeChangeAddress: "Хаяг өөрчлөх",
    homeAddressSample: "БЗД, 3-р хороо, 2-р байр, 2-29тоот",
    searchPlaceholder: "Хайх...",
    cartEmptyTitle: "Сагс хоосон байна",
    cartEmptyDesc: "Хоол нэмэхийн тулд нүүр хуудас руу буцна уу",
    cartSelectFood: "Хоол сонгох",
    cartTotal: "Нийт дүн:",
    cartCheckout: "Төлбөр төлөх",
    cartRemove: "Устгах",
    cartLoginRequired: "Та эхлээд нэвтрэх шаардлагатай!",
    paymentAddress: "Хаяг",
    paymentPhone: "Утас",
    paymentVoucher: "Voucher",
    paymentNoVoucher: "Купон байхгүй",
    paymentFoodPrice: "Хоолны үнэ",
    paymentDeliveryFee: "Хүргэлтийн төлбөр",
    paymentDiscount: "Хөнгөлөлт",
    paymentTotal: "Нийт дүн",
    paymentPay: "Төлөх",
    paymentCard: "Карт",
    paymentOrderSuccess: "Захиалга амжилттай боллоо!",
    accEdit: "засах",
    accOrders: "Захиалга",
    accSaved: "Хадгалсан",
    accVouchers: "Купон",
    accMyOrders: "Миний захиалга",
    accFavorites: "Таалагдсан",
    accMyVouchers: "Миний купон",
    accFaq: "FAQ",
    accLogout: "Гарах",
    accFaq1Q: "Тэжээвэр амьтантай орж болох уу?",
    accFaq1A: "Тийм, бид нохой муур гэх мэт тэжээвэр амьтдыг зөвхөн terrace дээр зөвшөөрдөг.",
    accFaq2Q: "Хэрхэн захиалга өгөх вэ?",
    accFaq2A: "Та хүссэн бүтээгдэхүүнээ сонгоод сагсанд нэмэх товч дээр дарна. Хэрэв аль хэдийн нэвтэрсэн бол дараа нь сагс руу орж захиалга баталгаажуулна.",
    accFaq3Q: "Хүргэлтийн хугацаа хэр вэ?",
    accFaq3A: "Хүргэлт ихэвчлэн 20-60 минутын дотор хийгдэнэ. Байршлаас хамааран хугацаа өөр байж болно.",
    accFaq4Q: "Төлбөрийн аргууд юу байна?",
    accFaq4A: "Бид бэлэн мөнгө болон картаар төлбөр хүлээн авдаг.",
    accFaq5Q: "Хаяг байршил",
    accFaq5A: "Building 21, 50 Myangat, CHD - 2 khoroo, Ulaanbaatar 15172, (Төв зам дагуу Peace mall-с баруун тийш 150метр.)",
    accLoadError: "Мэдээлэл татахад: ",
    accRetry: " Дахин оролдоно уу.",
    accServerError: "Серверт холбогдоход алдаа гарлаа. Холболтоо шалгаад дахин оролдоно уу.",
    accLogoutSuccess: "Та амжилттай гарлаа",
    accUser: "Хэрэглэгч",
    loginTitle: "Нэвтрэх",
    registerTitle: "Бүртгүүлэх",
    loginFullName: "Бүтэн нэр",
    loginAddress: "Гэрийн хаяг",
    loginEmail: "И-мэйл",
    loginPassword: "Нууц үг",
    loginNamePlaceholder: "Овог нэр",
    loginAddressPlaceholder: "Хот, дүүрэг, хороо",
    loginNoAccount: "Бүртгэлгүй юу?",
    loginHaveAccount: "Бүртгэлтэй юу?",
    loginRegisterLink: "Бүртгүүлэх",
    loginLoginLink: "Нэвтрэх",
    loginWait: "Түр хүлээнэ үү...",
    loginRegisterSuccess: "Бүртгэл амжилттай! Одоо нэвтэрнэ үү.",
    loginWelcome: "Сайн байна уу, ",
  },
  en: {
    langName: "English",
    headerCart: "Cart",
    headerSave: "Favorites",
    headerProfile: "Profile",
    homeCategory: "Category",
    homeChangeAddress: "Change address",
    homeAddressSample: "BZD, 3rd khoroo, Building 2, #2-29",
    searchPlaceholder: "Search...",
    cartEmptyTitle: "Your cart is empty",
    cartEmptyDesc: "Go back to home to add food",
    cartSelectFood: "Choose food",
    cartTotal: "Total:",
    cartCheckout: "Checkout",
    cartRemove: "Remove",
    cartLoginRequired: "Please log in first!",
    paymentAddress: "Address",
    paymentPhone: "Phone",
    paymentVoucher: "Voucher",
    paymentNoVoucher: "No voucher",
    paymentFoodPrice: "Food price",
    paymentDeliveryFee: "Delivery fee",
    paymentDiscount: "Discount",
    paymentTotal: "Total",
    paymentPay: "Pay",
    paymentCard: "Card",
    paymentOrderSuccess: "Order placed successfully!",
    accEdit: "Edit",
    accOrders: "Orders",
    accSaved: "Saved",
    accVouchers: "Voucher",
    accMyOrders: "My Orders",
    accFavorites: "Favorites",
    accMyVouchers: "My Vouchers",
    accFaq: "FAQ",
    accLogout: "Logout",
    accFaq1Q: "Can I bring my pet?",
    accFaq1A: "Yes, we allow pets like dogs and cats on the terrace only.",
    accFaq2Q: "How do I place an order?",
    accFaq2A: "Select your items and tap Add to cart. If you are already logged in, go to cart and confirm your order.",
    accFaq3Q: "What is the delivery time?",
    accFaq3A: "Delivery usually takes 20-60 minutes. Time may vary by location.",
    accFaq4Q: "What payment methods do you accept?",
    accFaq4A: "We accept cash and card payments.",
    accFaq5Q: "Address & location",
    accFaq5A: "Building 21, 50 Myangat, CHD - 2 khoroo, Ulaanbaatar 15172, (150m west from Peace mall on the main road.)",
    accLoadError: "Error loading: ",
    accRetry: " Please try again.",
    accServerError: "Could not connect to server. Check your connection and try again.",
    accLogoutSuccess: "You have logged out successfully",
    accUser: "User",
    loginTitle: "Login",
    registerTitle: "Register",
    loginFullName: "Full name",
    loginAddress: "Address",
    loginEmail: "Email",
    loginPassword: "Password",
    loginNamePlaceholder: "Full name",
    loginAddressPlaceholder: "City, district, khoroo",
    loginNoAccount: "Don't have an account?",
    loginHaveAccount: "Already have an account?",
    loginRegisterLink: "Register",
    loginLoginLink: "Login",
    loginWait: "Please wait...",
    loginRegisterSuccess: "Registration successful! Please log in.",
    loginWelcome: "Hello, ",
  },
};

class LangStore {
  constructor() {
    this.current = localStorage.getItem(STORAGE_KEY) || "mn";
    this.listeners = [];
  }

  getLang() {
    return this.current;
  }

  t(key) {
    const lang = translations[this.current] || translations.mn;
    return lang[key] ?? key;
  }

  setLanguage(lang) {
    if (lang !== "mn" && lang !== "en") return;
    this.current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== callback);
    };
  }

  notify() {
    this.listeners.forEach((cb) => cb(this.current));
  }
}

const langStore = new LangStore();
export default langStore;
