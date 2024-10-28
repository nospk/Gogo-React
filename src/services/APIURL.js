
export const DOMAIN = localStorage.getItem("host")?localStorage.getItem("host"):(process.env.NODE_ENV==="development"?"http://localhost:8080":"https://caysenda.vn")
/**
 * Authentication
 * */
export const LOGIN:string = DOMAIN+"/authentication/login";
export const CHECK_TOKEN:string = DOMAIN+"/authentication/check-token";
export const REGISTER:string = DOMAIN+"/admin/register";
/** End Authentication */
/**
 * Category
 * */
export const CATEGORY_FINDALL = DOMAIN+"/api/admin/category"
export const CATEGORY_CREATE = DOMAIN+"/api/admin/category"
export const CATEGORY_UPDATE = DOMAIN+"/api/admin/category"
export const CATEGORY_DELETE = DOMAIN+"/api/admin/category"
export const CATEGORY_UPDATE_HOST = DOMAIN+"/api/admin/category/update-host"
export const CATEGORY_PRICE_QUOTE = DOMAIN+"/api/admin/category/price-quote"
export const CATEGORY_GENERATE_IMAGE = DOMAIN+"/api/admin/category/generatezip-thumbnail"
export const CATEGORY_GENERATE_IMAGES = DOMAIN+"/api/admin/category/generatezip-images"
export const CATEGORY_GENERATE_SHOPEE_TEMPLATE = DOMAIN+"/api/admin/category/generate-shopee-template"
export const CATEGORY_CATEGORY_SHOPEE = DOMAIN+"/api/admin/category/shopee-category"
export const CATEGORY_GENERATE_LAZADA_TEMPLATE = DOMAIN+"/api/admin/category/generate-lazada-template"

export const CATEGORY_FINDALL_CURRENTHOST = DOMAIN+"/api/admin/category/findcurrentHost"
/** End Category */

/**
 * Product
 * */
export const PRODUCT_FINDALL = DOMAIN+"/api/admin/product"
export const PRODUCT_CREATE = DOMAIN+"/api/admin/product"
export const PRODUCT_FINDBYID = DOMAIN+"/api/admin/product/findbyid"
export const PRODUCT_UPDATETOPFLAG= DOMAIN+"/api/admin/product/updatetopflag"
export const PRODUCT_UPDATEKEYWORD= DOMAIN+"/api/admin/product/updatekeyword"
export const PRODUCT_UPDATE = ""
export const PRODUCT_DELETE = DOMAIN+"/api/admin/product"
export const PRODUCT_DELETE_BY_CATEGORY = DOMAIN+"/api/admin/product/delete-bycat"
export const PRODUCT_IMPORT_EXCEL = DOMAIN+"/api/admin/product/import-excel"
export const PRODUCT_FINDFORPICKER = DOMAIN+"/api/admin/product/search-product-variant";
export const PRODUCT_GENERATE_IMAGE_ZIP = DOMAIN+"/api/admin/product/generate-imagezip";
/** End Product */


/**
 * user
 * */
export const USER_FINDALL = DOMAIN+"/api/admin/user"
export const USER_FINDONE = DOMAIN+"/api/admin/user/findbyid"
export const USER_CREATE = DOMAIN+"/api/admin/user"
export const USER_UPDATE = DOMAIN+"/api/admin/user"
export const USER_DELETE = DOMAIN+"/api/admin/user"
export const ROLE_FINDALL = DOMAIN+"/api/admin/user/findall-role";
export const USER_EXPORT_USER = DOMAIN+"/api/admin/user/export-users";

/** End User */

/**
 * Order
 * */
export const ORDER_FINDALL = DOMAIN+"/api/admin/order"
export const ORDER_FINDBYID = DOMAIN+"/api/admin/order/findbyid"
export const ORDER_GETMETHODANDSTATUS = DOMAIN+"/api/admin/order/get-method-status"
export const ORDER_CREATE = DOMAIN+"/api/admin/order"
export const ORDER_UPDATE = DOMAIN+"/api/admin/order"
export const ORDER_DELETE = DOMAIN+"/api/admin/order"
export const ORDER_ACTION = DOMAIN+"/api/admin/order/actions";
export const ORDER_QUICKVIEW_UPDATE = DOMAIN+"/api/admin/order/quickview-update";
export const ORDER_COUNT_BY_STATUS = DOMAIN+"/api/admin/order/countbystatus";
export const ORDER_STATICTIS_PRODUCT = DOMAIN+"/api/admin/order/statictis-product";
export const CART_LIST = DOMAIN+"/api/admin/order/cart-statictis";
export const CART_DETAIL = DOMAIN+"/api/admin/order/cart-detailt";
export const ORDER_SPLIT = DOMAIN+"/api/admin/order/split";
export const ORDER_TRACKING = DOMAIN+"/api/admin/order/tracking";
export const ORDER_EXCHANGE_RATE_TRACKING = DOMAIN+"/api/admin/order/exchange-rate-tracking";
export const ORDER_STATICTIS_TRACKING = DOMAIN+"/api/admin/dashboard/statictis-tracking";
/** End Order */
/**
 * Image
 * */
export const IMAGE_FINDALL = DOMAIN+"/api/admin/image"
export const IMAGE_UPLOAD = DOMAIN+"/api/admin/image/upload"
export const IMAGE_ZIP_UPLOAD = DOMAIN+"/api/admin/image/uploadzip"
export const IMAGE_ZIP_UPDATE = DOMAIN+"/api/admin/image/update"
export const IMAGE_DELETE = DOMAIN+"/api/admin/image"

/** End Image*/

/**
 * Extension
 * */

export const EXTENSION_SHOP = DOMAIN+"/extention/shop";
export const EXTENSION_SHOP_UPDATE_SKU = DOMAIN+"/extention/update-sku";
export const EXTENSION_PRODUCT = DOMAIN+"/extention/product";
export const EXTENSION_DETAILT = DOMAIN+"/extention/findproductbyid";
export const EXTENSION_PRODUCT_UPDATE = DOMAIN+"/extention/product";
export const EXTENSION_BULK_ACTION = DOMAIN+"/extention/bulkaction";
export const EXTENSION_UPDATE_TO_WEB = DOMAIN+"/extention/shop/upload-to-web";
export const EXTENSION_EMPLOYEE = DOMAIN+"/extention/employee";
export const EXTENSION_EXCEL = DOMAIN+"/extention/export-excel";
export const EXTENSION_REMOVE_PRODUCT = DOMAIN+"/extention/deleteproductbyid";
export const EXTENSION_DISABLE_ASYNCHRONIZE = DOMAIN+"/extention/disable-synchronize";
export const EXTENSION_REMOVE = DOMAIN+"/extention/delete";
export const EXTENSION_CART = DOMAIN+"/extention/cart";
export const EXTENSION_UPDATE_RATE_AND_FACTOR = DOMAIN+"/extention/update-rate-and-factor";
export const EXTENSION_IMAGE_PROCESSING = DOMAIN+"/extention/image-processing";
export const EXTENSION_UPDATE_PRODUCTS_INFO = DOMAIN+"/extention/update-product-info";
export const EXTENSION_UPDATE_CURRENTCY_RATE = DOMAIN+"/extention/update-currency-rate";
export const EXTENSION_UPDATE_ENABLEPRICE = DOMAIN+"/extention/update-enableprice";
export const EXTENSION_TRANSLATE = DOMAIN+"/extention/translate";
export const EXTENSION_DOWNLOADVIDEO = DOMAIN+"/extention/downloadvideo";

/** End Extension */
/** Setting */
export const SETTING_SLIDEHOME = DOMAIN+"/api/admin/setting/slide-home";
export const SETTING_BANNERTOP = DOMAIN+"/api/admin/setting/banner-top";
export const SETTING_BANNER = DOMAIN+"/api/admin/setting/banner";
export const SETTING_MENU =  DOMAIN+"/api/admin/setting/menu";
export const SETTING_WEBSITE =  DOMAIN+"/api/admin/setting/website";
export const SETTING_EMAIL =  DOMAIN+"/api/admin/setting/email";
export const SETTING_PRICE =  DOMAIN+"/api/admin/setting/price";
export const SETTING_SHIP =  DOMAIN+"/api/admin/setting/ship";
export const SETTING_TRADEMARK =  DOMAIN+"/api/admin/setting/brand";
export const SETTING_EMBED =  DOMAIN+"/api/admin/setting/embed";
export const SETTING_EMBED_SOCIAL =  DOMAIN+"/api/admin/setting/embed-social";
export const SETTING_ROBOTS =  DOMAIN+"/api/admin/setting/robots";
export const SETTING_CREATE_SITEMAP =  DOMAIN+"/api/admin/setting/create-sitemap";
export const SETTING_FACEBOOK =  DOMAIN+"/api/admin/setting/facebook";
export const SETTING_GEO2IP =  DOMAIN+"/api/admin/setting/geo2ip";
export const SETTING_DELIVERY=  DOMAIN+"/api/admin/setting/delivery";
/** End Settting*/
/** Address */
export const ADDRESS_GETPROVINCES = DOMAIN+"/api/admin/address/get-provinces";
export const ADDRESS_GETDICTRICTS = DOMAIN+"/api/admin/address/get-dictricts";
export const ADDRESS_GETWARDS = DOMAIN+"/api/admin/address/get-wards";

/** PAGE */
export const PAGE_SAVE = DOMAIN+"/api/admin/post";
export const PAGE_FINDALL = DOMAIN+"/api/admin/post";
export const PAGE_FINDONE = DOMAIN+"/api/admin/post/findbyid";
export const PAGE_DELETE = DOMAIN+"/api/admin/post";
export const PAGE_ADDTOTRASH= DOMAIN+"/api/admin/post";
export const PAGE_CHANGE_TYPE = DOMAIN+"/api/admin/post";
/** END PAGE*/
/** PARTNER */
export const PARTNER_FINDALL = DOMAIN+"/api/admin/partner";
export const PARTNER_SAVE = DOMAIN+"/api/admin/partner";
export const PARTNER_DELETE = DOMAIN+"/api/admin/partner";
/** END PARTNER*/
export const FIND_PROGRESS = DOMAIN+"/api/admin/progress";
/** PRINT */
export const PRINT = DOMAIN+"/print"
/** GHN */
export const GHN_SETTING = DOMAIN+"/api/ghn/setting";
export const GHN_SHOP = DOMAIN+"/api/ghn/store";
export const GHN_ORDER = DOMAIN+"/api/ghn/order";
export const GHN_PICK_SHIFT = DOMAIN+"/api/ghn/pick-shift";
export const GHN_FEE = DOMAIN+"/api/ghn/fee";
export const GHN_SERVICE = DOMAIN+"/api/ghn/service";
export const GHN_LIST = DOMAIN+"/api/ghn/list";
export const GHN_PRINT = DOMAIN+"/api/ghn/print";
export const GHN_CANCEL = DOMAIN+"/api/ghn/cancel";
export const GHN_TRACKING = DOMAIN+"/api/ghn/tracking";
export const GHN_FINDALLBYORDERID = DOMAIN+"/api/ghn/get-list-order-byid";
/** END GHN*/
/** REPORT */
export const REPORT_STATISTIC_AREA= DOMAIN+"/api/admin/report/statistic-area";
/** END REPORT */
/**
 * Log
 * */
export const LOG = DOMAIN+"/api/admin/log";
export const LOG_DELETE = DOMAIN+"/api/admin/log";
/** END log*/
/**
 * Dictionary
 * */
export const DICTIONARY_BASE = DOMAIN+"/api/admin/dictionary";
export const DICTIONARY_EXCEL = DOMAIN+"/api/admin/dictionary/upload-excel";
/** END Dictionary*/
/**
 * Keywords
 * */
export const KEYWORD_STATICTIS = DOMAIN+"/api/admin/dashboard/keywords";

/** END Dictionary*/
/** FACEBOOK */
export const FACEBOOK_FINDALL = DOMAIN+"/api/admin/facebook";
export const FACEBOOK_CREATE_POST = DOMAIN+"/api/admin/facebook/create-post";
export const FACEBOOK_DELETE_POST = DOMAIN+"/api/admin/facebook/delete-post";
export const FACEBOOK_COUNT_UPLOADED = DOMAIN+"/api/admin/facebook/count-uploaded";
export const FACEBOOK_CANCEL = DOMAIN+"/api/admin/facebook/cancel";
/** END FACEBOOK*/
/** LAZADA */
export const LAZADA_GETTOKEN = DOMAIN+"/api/admin/lazada/token";
export const LAZADA_GETDATA = DOMAIN+"/api/admin/lazada";
export const LAZADA_GETCATEGORIES = DOMAIN+"/api/admin/lazada/categories";
export const LAZADA_REMOVE_PRODUCT = DOMAIN+"/api/admin/lazada/removeproduct";
export const LAZADA_CREATE_TO_LAZADA = DOMAIN+"/api/admin/lazada/uptolazada";
/** END LAZADA*/

/** DELIVERY */
export const DELIVERY = DOMAIN+"/api/admin/delivery";
export const DELIVERY_STATUS = DOMAIN+"/api/admin/delivery/addstatus";
export const DELIVERY_COUNT= DOMAIN+"/api/admin/delivery/count";
export const DELIVERY_ORDER = DOMAIN+"/api/admin/delivery/order";
export const DELIVERY_ADD_STATUS = DOMAIN+"/api/admin/delivery/order/addstatus";
export const DELIVERY_ORDERCOUNT= DOMAIN+"/api/admin/delivery/count";

export const DELIVERY_CURRENCY = DOMAIN+"/api/admin/delivery/currency";
export const DELIVERY_CHANGESTATUS_CURRENCY = DOMAIN+"/api/admin/delivery/changecurrencystatus";
export const DELIVERY_CURRENCYCOUNT= DOMAIN+"/api/admin/delivery/count";
/** END DELIVERY*/
/** DELIVERY */
export const DB_ACCESS_DATA = DOMAIN + "/api/admin/dataaccess";
/** END DELIVERY*/

