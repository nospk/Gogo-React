const data = [
    {
    id: "dashboards",
    icon: "iconsminds-shop-4",
    label: "menu.dashboards",
    to: "/admin/dashboards",
  },
  {
    id: "library",
    icon: "iconsminds-shop-4",
    label: "menu.library.image",
    to: "/admin/image",
  },
  {
    id: "product",
    icon: "iconsminds-shop-4",
    label: "menu.product.page",
    to: "/admin/product",
    subs: [
        {
        icon: "simple-icon-briefcase",
        label: "menu.product.list",
        to: "/admin/product"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.product.create",
        to: "/admin/product/create"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.product.stockmanager",
        to: "/admin/product/stockmanager"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.product.category",
        to: "/admin/category"
      },
    ]
  },
  {
    id: "order",
    icon: "iconsminds-shop-4",
    label: "menu.order",
    to: "/admin/order",
    showBadge:true,

    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.order.list",
        to: "/admin/order"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.order.create",
        to: "/admin/order/create"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.order.cart_list",
        to: "/admin/order/cart-list"
      },
      {
        icon: "simple-icon-briefcase",
        label: "extention.cart",
        to: "/admin/extention/cart"
      },
    ]
  },
  {
    id: "extention",
    icon: "iconsminds-shop-4",
    label: "extention.menu",
    to: "/admin/extention/shop",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "extention.shop",
        to: "/admin/extention/shop"
      },
      {
        icon: "simple-icon-briefcase",
        label: "extention.products",
        to: "/admin/extention/product"
      },
      {
        icon: "simple-icon-briefcase",
        label: "extention.dictionary",
        to: "/admin/extention/dictionary"
      },
      {
        icon: "simple-icon-briefcase",
        label: "chatgpt.setting",
        to: "/admin/chatgpt"
      },
      {
        icon: "simple-icon-briefcase",
        label: "chatgpt.log",
        to: "/admin/chatgpt/log"
      },
      {
        icon: "simple-icon-briefcase",
        label: "Log",
        to: "/admin/extention/log"
      },
    ]
  },
  {
    id: "delivery",
    icon: "iconsminds-shop-4",
    label: "menu.delivery",
    to: "/admin/delivery/form/delivery",
    count:"deliveryall",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.delivery.form.delivery",
        to: "/admin/delivery/form/delivery",
        count:"delivery"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.delivery.form.order",
        to: "/admin/delivery/form/order",
        count:"deliveryorder"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.delivery.form.currencyconversion",
        to: "/admin/delivery/form/currencyconversion",
        count:"deliverycurrency"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.delivery.setting.content",
        to: "/admin/delivery/content"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.delivery.setting.seo",
        to: "/admin/delivery/seo"
      }
    ]
  },
  {
    id: "post",
    icon: "iconsminds-shop-4",
    label: "menu.post",
    to: "/admin/post",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.post.list",
        to: "/admin/post"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.post.create",
        to: "/admin/post/create"
      },
    ]
  },
  {
    id: "user",
    icon: "iconsminds-shop-4",
    label: "menu.user",
    to: "/admin/user",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.user.list",
        to: "/admin/user"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.user.create",
        to: "/admin/user/create"
      },
    ]
  },
  {
    id: "setting",
    icon: "iconsminds-shop-4",
    label: "menu.setting",
    to: "/admin/setting/website",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.website",
        to: "/admin/setting/website"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.slide",
        to: "/admin/setting/slide"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.banner1",
        to: "/admin/setting/banner1"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.banner2",
        to: "/admin/setting/banner2"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.menu",
        to: "/admin/setting/menu"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.email",
        to: "/admin/setting/email"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.price",
        to: "/admin/setting/price"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.ship",
        to: "/admin/setting/ship"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.brand",
        to: "/admin/setting/brand"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.embed",
        to: "/admin/setting/embed"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.social",
        to: "/admin/setting/embed-social"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.robots",
        to: "/admin/setting/robots"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.setting.geo2ip",
        to: "/admin/setting/geo2ip"
      },
    ]
  },
  {
    id: "partner",
    icon: "iconsminds-shop-4",
    label: "menu.partner",
    to: "/admin/partner",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.partner.list",
        to: "/admin/partner"
      },
    ]
  },
  {
    id: "ghn",
    icon: "iconsminds-shop-4",
    label: "menu.ghn",
    to: "/admin/ghn/setting",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.ghn.setting",
        to: "/admin/ghn/setting"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.ghn.order",
        to: "/admin/ghn/order"
      },
    ]
  },
  {
    id: "lazada",
    icon: "iconsminds-shop-4",
    label: "menu.lazada",
    to: "/admin/lazada",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.lazada.list",
        to: "/admin/lazada"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.lazada.setting",
        to: "/admin/lazada/setting"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.lazada.detail",
        to: "/admin/lazada/detail"
      },

    ]
  },
  {
    id: "log",
    icon: "iconsminds-shop-4",
    label: "menu.log",
    to: "/admin/log",

  },
  {
    id: "facebook",
    icon: "iconsminds-shop-4",
    label: "menu.facebook",
    to: "/admin/facebook",
    subs: [
      {
        icon: "simple-icon-briefcase",
        label: "menu.facebook.setting",
        to: "/admin/facebook"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.facebook.categories",
        to: "/admin/facebook/categories"
      },
      {
        icon: "simple-icon-briefcase",
        label: "menu.facebook.uploaded",
        to: "/admin/facebook/uploaded"
      },
    ]
  },

];
export default data;
