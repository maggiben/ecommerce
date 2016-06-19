window.data_models = {
    "count": 20,
    "results": [{
        "abstract": true,
        "api": "com",
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            }
        },
        "id": "com.base",
        "name": "base",
        "name_field": "id",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 10,
            "sort": "id desc"
        },
        "version": "1.0.2-1"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "accounts": {
                "methods": {
                    "login": true,
                    "update_contact": false,
                    "update_subscription": true,
                    "store_card": true,
                    "store_address": true,
                    "merge_card": true,
                    "merge_address": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "type": {
                "type": "string",
                "enum": [{
                    "value": "individual",
                    "label": "Individual"
                }, {
                    "value": "business",
                    "label": "Business"
                }],
                "default": "individual",
                "immutable": true,
                "label": "Account Type"
            },
            "name": {
                "type": "string",
                "formula": "if(type == 'individual', trim(first_name+' '+last_name), name)",
                "label": "Account Name",
                "rules": [{
                    "conditions": {
                        "type": "business"
                    },
                    "required": true
                }]
            },
            "first_name": {
                "type": "string"
            },
            "last_name": {
                "type": "string"
            },
            "email": {
                "type": "string",
                "format": "email",
                "required": true,
                "unique": true
            },
            "password": {
                "type": "string",
                "format": "password",
                "description": "Optionally used to allow\/restrict access to account data"
            },
            "password_reset_key": {
                "type": "string",
                "description": "Optionally provide a one-time use key for password reset"
            },
            "password_reset_url": {
                "type": "string",
                "format": "url",
                "description": "Optionally provide a one-time use URL for password reset"
            },
            "date_last_login": {
                "type": "date"
            },
            "group": {
                "type": "string",
                "description": "Exclusive group an account may belong to"
            },
            "segments": {
                "type": "array",
                "value_type": "string",
                "description": "Inclusive segments an account may belong to"
            },
            "cards": {
                "id": "com.accounts:cards",
                "name": "accounts:cards",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "accounts",
                        "key": "parent_id",
                        "label": " Account"
                    },
                    "token": {
                        "type": "string",
                        "required": true
                    },
                    "exp_month": {
                        "type": "int"
                    },
                    "exp_year": {
                        "type": "int"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "last4": {
                        "type": "string",
                        "length": 4,
                        "label": "Last 4 Digits"
                    },
                    "gateway": {
                        "type": "string"
                    },
                    "test": {
                        "type": "bool"
                    },
                    "address_check": {
                        "type": "string"
                    },
                    "zip_check": {
                        "type": "string"
                    },
                    "cvc_check": {
                        "type": "string"
                    },
                    "billing": {
                        "type": "object",
                        "fields": {
                            "name": {
                                "type": "string",
                                "label": "Billing Name"
                            },
                            "phone": {
                                "type": "string",
                                "format": "phone",
                                "label": "Phone Number"
                            },
                            "address1": {
                                "type": "string",
                                "label": "Address Line 1"
                            },
                            "address2": {
                                "type": "string",
                                "label": "Address Line 2"
                            },
                            "city": {
                                "type": "string"
                            },
                            "state": {
                                "type": "string",
                                "label": "State\/Province"
                            },
                            "zip": {
                                "type": "string",
                                "label": "Zip\/Postal Code"
                            },
                            "country": {
                                "type": "string",
                                "length": 2
                            }
                        }
                    },
                    "active": {
                        "type": "bool",
                        "default": true
                    },
                    "fingerprint": {
                        "type": "string"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 10,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "id",
                "parent": "accounts",
                "type": "collection",
                "label": "Credit Card",
                "plural": "Credit Cards",
                "extends": "base",
                "description": "Stored credit cards used by an account"
            },
            "addresses": {
                "id": "com.accounts:addresses",
                "name": "accounts:addresses",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "accounts",
                        "key": "parent_id",
                        "label": " Account"
                    },
                    "name": {
                        "type": "string"
                    },
                    "phone": {
                        "type": "string",
                        "format": "phone",
                        "label": "Phone Number"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "fingerprint": {
                        "type": "string"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "address1",
                "parent": "accounts",
                "type": "collection",
                "label": "Address",
                "plural": "Addresses",
                "extends": "base",
                "description": "Stored addresses used by an account"
            },
            "billing": {
                "type": "object",
                "description": "Default account billing information",
                "fields": {
                    "name": {
                        "type": "string",
                        "label": "Billing Name"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "phone": {
                        "type": "string",
                        "label": "Phone Number"
                    },
                    "method": {
                        "type": "string",
                        "label": "Payment Method"
                    },
                    "card": {
                        "type": "object",
                        "label": "Payment Card",
                        "fields": {
                            "token": {
                                "type": "string",
                                "required": true
                            },
                            "exp_month": {
                                "type": "int"
                            },
                            "exp_year": {
                                "type": "int"
                            },
                            "brand": {
                                "type": "string"
                            },
                            "last4": {
                                "type": "string"
                            },
                            "gateway": {
                                "type": "string"
                            },
                            "test": {
                                "type": "bool"
                            },
                            "address_check": {
                                "type": "string"
                            },
                            "zip_check": {
                                "type": "string"
                            },
                            "cvc_check": {
                                "type": "string"
                            }
                        }
                    },
                    "account_card_id": {
                        "type": "objectid"
                    },
                    "account_card": {
                        "type": "link",
                        "model": "accounts:cards",
                        "key": "account_card_id"
                    }
                }
            },
            "shipping": {
                "type": "object",
                "description": "Default account shipping information",
                "fields": {
                    "name": {
                        "type": "string",
                        "label": "Shipping Name"
                    },
                    "phone": {
                        "type": "string",
                        "label": "Phone Number"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "account_address_id": {
                        "type": "objectid"
                    },
                    "account_address": {
                        "type": "link",
                        "model": "accounts:addresses",
                        "key": "account_address_id"
                    }
                }
            },
            "credits": {
                "id": "com.accounts:credits",
                "name": "accounts:credits",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "accounts",
                        "key": "parent_id",
                        "label": " Account"
                    },
                    "number": {
                        "type": "string",
                        "immutable": true,
                        "unique": true,
                        "auto": true,
                        "increment": {
                            "pattern": "{100000}"
                        },
                        "label": "Credit Number"
                    },
                    "amount": {
                        "type": "currency",
                        "immutable": true,
                        "required": true,
                        "label": "Credit Amount"
                    },
                    "payment_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "payment": {
                        "type": "link",
                        "model": "payments",
                        "key": "payment_id"
                    },
                    "refund_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "refund": {
                        "type": "link",
                        "model": "payments:refunds",
                        "key": "refund_id"
                    },
                    "invoice_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "invoice": {
                        "type": "link",
                        "model": "invoices",
                        "key": "invoice_id"
                    },
                    "credit_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "credit": {
                        "type": "link",
                        "model": "credits",
                        "key": "credit_id"
                    },
                    "reason": {
                        "type": "string"
                    },
                    "currency": {
                        "type": "string",
                        "length": 3
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "number",
                "parent": "accounts",
                "type": "collection",
                "label": "Account Credit",
                "plural": "Account Credits",
                "extends": "base",
                "description": "Account credit transactions",
                "triggers": [{
                    "id": "update_account_balance",
                    "label": "Update Account Balance",
                    "events": ["insert.result", "update.result", "delete.result"],
                    "include": {
                        "balance": {
                            "url": "\/accounts:credits\/:group",
                            "params": {
                                "where": {
                                    "parent_id": "parent_id"
                                }
                            },
                            "data": {
                                "value": {
                                    "__D__sum": "amount"
                                }
                            }
                        }
                    },
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "model": "accounts",
                        "key": "parent_id",
                        "params": {
                            "balance": "balance.value"
                        }
                    }]
                }]
            },
            "balance": {
                "type": "currency",
                "readonly": true,
                "default": 0,
                "label": "Account Balance",
                "description": "Balance of account credits"
            },
            "contact_id": {
                "type": "objectid"
            },
            "contact": {
                "type": "link",
                "model": "contacts",
                "key": "contact_id",
                "label": "Primary Contact"
            },
            "contacts": {
                "type": "link",
                "model": "contacts",
                "params": {
                    "account_id": "id"
                }
            },
            "carts": {
                "type": "link",
                "model": "carts",
                "params": {
                    "account_id": "id"
                }
            },
            "orders": {
                "type": "link",
                "model": "orders",
                "params": {
                    "account_id": "id"
                }
            },
            "invoices": {
                "type": "link",
                "params": {
                    "account_id": "id"
                }
            },
            "subscriptions": {
                "type": "link",
                "model": "subscriptions",
                "params": {
                    "account_id": "id"
                },
                "data": {
                    "active": true
                }
            },
            "currency": {
                "type": "string",
                "length": 3
            }
        },
        "id": "com.accounts",
        "label": "Account",
        "name": "accounts",
        "name_field": "name",
        "plural": "Accounts",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "secondary_field": "email",
        "triggers": [],
        "version": "1.0.2-12"
    }, {
        "api": "com",
        "extends": "base",
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "name": {
                "type": "string",
                "required": true
            },
            "slug": {
                "type": "string",
                "format": "slug",
                "default": {
                    "__D__formula": "slug(name)"
                }
            },
            "meta_title": {
                "type": "string",
                "label": "Page Title"
            },
            "meta_keywords": {
                "type": "string"
            },
            "meta_description": {
                "type": "string",
                "multiline": true
            },
            "active": {
                "type": "bool",
                "default": false
            },
            "posts": {
                "id": "com.blogs:posts",
                "name": "blogs:posts",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "blogs",
                        "key": "parent_id",
                        "label": " Blog"
                    },
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "slug": {
                        "type": "string",
                        "format": "slug",
                        "default": {
                            "__D__formula": "slug(name)"
                        }
                    },
                    "content": {
                        "type": "string",
                        "format": "html",
                        "multiline": true
                    },
                    "summary": {
                        "type": "string",
                        "format": "html",
                        "multiline": true
                    },
                    "tags": {
                        "type": "array",
                        "value_type": "string",
                        "unique": true
                    },
                    "published": {
                        "type": "bool",
                        "default": false
                    },
                    "date_published": {
                        "type": "date",
                        "label": "Publish Date"
                    },
                    "meta_title": {
                        "type": "string",
                        "label": "Page Title"
                    },
                    "meta_keywords": {
                        "type": "string"
                    },
                    "meta_description": {
                        "type": "string",
                        "multiline": true
                    },
                    "redirect": {
                        "type": "string",
                        "format": "url"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "name",
                "parent": "blogs",
                "type": "collection",
                "label": "Blog Post",
                "plural": "Blog Posts",
                "extends": "base",
                "secondary_field": "slug"
            }
        },
        "id": "com.blogs",
        "label": "Blog",
        "name": "blogs",
        "name_field": "name",
        "plural": "Blogs",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "name asc"
        },
        "secondary_field": "slug",
        "version": "1.0.2-1"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "orders": {
                "methods": {
                    "combine_items": true,
                    "default_items": true,
                    "default_account": true,
                    "default_shipping": true,
                    "rate_shipment": true,
                    "apply_coupon": true,
                    "apply_taxes": true
                }
            },
            "carts": {
                "tasks": {
                    "update_status": false
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "unique": true,
                "auto": true,
                "immutable": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Order Number"
            },
            "order_id": {
                "type": "objectid"
            },
            "order": {
                "type": "link",
                "model": "orders",
                "key": "order_id"
            },
            "items": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "auto": true,
                        "immutable": true
                    },
                    "quantity": {
                        "type": "int",
                        "default": 1,
                        "min": 1
                    },
                    "price": {
                        "type": "currency",
                        "default": {
                            "__D__formula": "if(product_id, product.price)"
                        }
                    },
                    "orig_price": {
                        "type": "currency"
                    },
                    "price_total": {
                        "type": "currency",
                        "formula": "price * quantity"
                    },
                    "delivery": {
                        "type": "string",
                        "enum": ["shipment", "download"],
                        "default": {
                            "__D__formula": "if(product_id, product.delivery)"
                        },
                        "immutable": true
                    },
                    "options": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "value": {
                                "type": "string"
                            }
                        }
                    },
                    "bundle_items": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "objectid"
                            },
                            "quantity": {
                                "type": "int",
                                "default": 1
                            },
                            "quantity_total": {
                                "type": "int",
                                "label": "Bundled Quantity"
                            },
                            "product_id": {
                                "type": "objectid",
                                "required": true
                            },
                            "product": {
                                "type": "link",
                                "model": "products",
                                "key": "product_id"
                            },
                            "delivery": {
                                "type": "string",
                                "enum": ["shipment", "download"],
                                "default": {
                                    "__D__formula": "if(product_id, product.delivery)"
                                },
                                "immutable": true
                            },
                            "shipment_weight": {
                                "type": "float",
                                "scale": 1
                            }
                        }
                    },
                    "shipment_weight": {
                        "type": "float",
                        "scale": 1
                    },
                    "discounts": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "amount": {
                                "type": "currency"
                            }
                        }
                    },
                    "discount_total": {
                        "type": "currency",
                        "formula": "sum(discounts.amount)"
                    },
                    "discount_each": {
                        "type": "currency",
                        "formula": "discount_total \/ quantity",
                        "label": "Discount Amount"
                    },
                    "taxes": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "amount": {
                                "type": "currency"
                            }
                        }
                    },
                    "tax_total": {
                        "type": "currency",
                        "formula": "sum(taxes.amount)"
                    },
                    "tax_each": {
                        "type": "currency",
                        "formula": "tax_total \/ quantity",
                        "label": "Tax Amount"
                    },
                    "product_id": {
                        "type": "objectid",
                        "required": true,
                        "immutable": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    }
                }
            },
            "discounts": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": ["sale", "coupon"]
                    },
                    "rule": {
                        "type": "object"
                    },
                    "amount": {
                        "type": "currency"
                    }
                }
            },
            "taxes": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "shipping": {
                        "type": "bool"
                    },
                    "priority": {
                        "type": "int"
                    },
                    "rate": {
                        "type": "float",
                        "scale": 3
                    },
                    "amount": {
                        "type": "currency"
                    }
                }
            },
            "billing": {
                "type": "object",
                "fields": {
                    "name": {
                        "type": "string",
                        "label": "Billing Name"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "phone": {
                        "type": "string",
                        "format": "phone",
                        "label": "Phone Number"
                    },
                    "method": {
                        "type": "string",
                        "label": "Payment Method"
                    },
                    "card": {
                        "type": "object",
                        "label": "Payment Card",
                        "fields": {
                            "token": {
                                "type": "string",
                                "required": true
                            },
                            "exp_month": {
                                "type": "int"
                            },
                            "exp_year": {
                                "type": "int"
                            },
                            "brand": {
                                "type": "string"
                            },
                            "last4": {
                                "type": "string"
                            },
                            "gateway": {
                                "type": "string"
                            },
                            "test": {
                                "type": "bool"
                            },
                            "address_check": {
                                "type": "string"
                            },
                            "zip_check": {
                                "type": "string"
                            },
                            "cvc_check": {
                                "type": "string"
                            }
                        }
                    },
                    "account_card_id": {
                        "type": "objectid"
                    },
                    "account_card": {
                        "type": "link",
                        "model": "accounts:cards",
                        "key": "account_card_id"
                    }
                }
            },
            "shipping": {
                "type": "object",
                "fields": {
                    "name": {
                        "type": "string",
                        "label": "Shipping Name"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "phone": {
                        "type": "string",
                        "label": "Phone Number"
                    },
                    "service": {
                        "type": "string",
                        "label": "Shipping Service ID"
                    },
                    "service_name": {
                        "type": "string",
                        "label": "Shipping Service Name"
                    },
                    "price": {
                        "type": "currency",
                        "label": "Shipping Price"
                    }
                }
            },
            "shipment_rating": {
                "type": "object",
                "fields": {
                    "date_created": {
                        "type": "date",
                        "auto": true
                    },
                    "md5": {
                        "type": "string"
                    },
                    "services": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "carrier": {
                                "type": "string"
                            },
                            "price": {
                                "type": "currency"
                            }
                        }
                    },
                    "errors": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "message": {
                                "type": "string"
                            },
                            "code": {
                                "type": "string"
                            }
                        }
                    }
                }
            },
            "schedule": {
                "type": "object",
                "fields": {
                    "interval": {
                        "type": "string",
                        "enum": [{
                            "value": "monthly",
                            "label": "Monthly"
                        }, {
                            "value": "daily",
                            "label": "Daily"
                        }, {
                            "value": "weekly",
                            "label": "Weekly"
                        }, {
                            "value": "yearly",
                            "label": "Yearly"
                        }]
                    },
                    "interval_count": {
                        "type": "int"
                    }
                }
            },
            "notes": {
                "type": "string",
                "multiline": true,
                "label": "Private Notes"
            },
            "comments": {
                "type": "string",
                "multiline": true,
                "label": "Customer Comments"
            },
            "active": {
                "type": "bool",
                "default": true
            },
            "status": {
                "type": "string",
                "default": "active",
                "readonly": true,
                "auto": true,
                "enum": [{
                    "value": "active",
                    "label": "Active",
                    "conditions": {
                        "active": true,
                        "order_id": null
                    }
                }, {
                    "value": "converted",
                    "label": "Converted",
                    "conditions": {
                        "order_id": {
                            "__D__ne": null
                        }
                    }
                }, {
                    "value": "abandoned",
                    "label": "Abandoned",
                    "conditions": {
                        "active": false,
                        "order_id": null
                    }
                }]
            },
            "sub_total": {
                "type": "currency",
                "formula": "sum(items.price_total)"
            },
            "item_discount": {
                "type": "currency",
                "formula": "sum(items.discount_total)"
            },
            "item_tax": {
                "type": "currency",
                "formula": "sum(items.tax_total)"
            },
            "item_tax_included": {
                "type": "bool"
            },
            "item_quantity": {
                "type": "int",
                "formula": "sum(items.quantity)"
            },
            "item_shipment_weight": {
                "type": "float",
                "scale": 1,
                "formula": "sum(items.shipment_weight)"
            },
            "discount_total": {
                "type": "currency",
                "formula": "item_discount"
            },
            "shipment_price": {
                "type": "currency",
                "formula": "shipping.price"
            },
            "shipment_discount": {
                "type": "currency"
            },
            "shipment_total": {
                "type": "currency",
                "formula": "shipment_price - shipment_discount"
            },
            "shipment_tax": {
                "type": "currency"
            },
            "shipment_tax_included": {
                "type": "bool"
            },
            "tax_total": {
                "type": "currency",
                "formula": "item_tax + shipment_tax"
            },
            "tax_included_total": {
                "type": "currency",
                "formula": "if(item_tax_included, 0, item_tax) + if(shipment_tax_included, 0, shipment_tax)"
            },
            "grand_total": {
                "type": "currency",
                "formula": "sub_total + shipment_total + tax_included_total - (discount_total)",
                "rounded": true
            },
            "coupon_code": {
                "type": "string"
            },
            "coupon_id": {
                "type": "objectid"
            },
            "coupon": {
                "type": "link",
                "model": "coupons",
                "key": "coupon_id"
            },
            "account_id": {
                "type": "objectid"
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            },
            "shipment_delivery": {
                "type": "bool",
                "readonly": true
            },
            "download_delivery": {
                "type": "bool",
                "readonly": true
            },
            "currency": {
                "type": "string",
                "length": 3
            }
        },
        "id": "com.carts",
        "label": "Cart",
        "name": "carts",
        "name_field": "number",
        "plural": "Carts",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "searches": [{
            "id": "default",
            "fields": ["number", "billing.name", "shipping.name"]
        }],
        "secondary_field": "number",
        "triggers": [],
        "version": "1.0.2-9"
    }, {
        "api": "com",
        "extends": "base",
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "name": {
                "type": "string",
                "required": true,
                "label": "Category Name"
            },
            "slug": {
                "type": "string",
                "unique": true,
                "default": {
                    "__D__formula": "slug(if(parent_id, join('-', parent.name, name), name))"
                },
                "description": "URL friendly identifier"
            },
            "active": {
                "type": "bool",
                "default": false,
                "description": "Indicates when a category is active"
            },
            "description": {
                "type": "string",
                "multiline": true
            },
            "images": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "name": {
                        "type": "string"
                    },
                    "caption": {
                        "type": "string"
                    },
                    "file": {
                        "type": "file",
                        "fields": {
                            "id": {
                                "type": "objectid",
                                "readonly": true
                            },
                            "date_uploaded": {
                                "type": "date",
                                "readonly": true
                            },
                            "length": {
                                "type": "int",
                                "readonly": true
                            },
                            "md5": {
                                "type": "string",
                                "readonly": true
                            },
                            "filename": {
                                "type": "string"
                            },
                            "content_type": {
                                "type": "string"
                            },
                            "metadata": {
                                "type": "object"
                            },
                            "data": {
                                "type": "filedata"
                            },
                            "url": {
                                "type": "string"
                            },
                            "width": {
                                "type": "int"
                            },
                            "height": {
                                "type": "int"
                            }
                        }
                    }
                }
            },
            "meta_description": {
                "type": "string",
                "multiline": true
            },
            "meta_keywords": {
                "type": "string"
            },
            "navigation": {
                "type": "bool",
                "label": "Used In Site Navigation",
                "description": "Indicates when a category should be used in site navigation"
            },
            "sort": {
                "type": "int",
                "default": 0,
                "label": "Sort Order",
                "description": "Number used to sort a category at root level or within a parent category"
            },
            "top_id": {
                "type": "objectid",
                "formula": "if(and(parent_id, parent.top_id), parent.top_id, parent_id)"
            },
            "top": {
                "type": "link",
                "model": "categories",
                "key": "top_id",
                "label": "Top Level Category",
                "description": "Top level parent of a category"
            },
            "parent_id": {
                "type": "objectid"
            },
            "parent": {
                "type": "link",
                "model": "categories",
                "key": "parent_id",
                "label": "Parent Category"
            },
            "children": {
                "type": "link",
                "model": "categories",
                "params": {
                    "parent_id": "id"
                },
                "label": "Child Categories"
            },
            "products": {
                "id": "com.categories:products",
                "name": "categories:products",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "categories",
                        "key": "parent_id",
                        "label": " Category"
                    },
                    "sort": {
                        "type": "int",
                        "default": 0,
                        "label": "Sort Order",
                        "description": "Number used to sort products within a parent category"
                    },
                    "product_id": {
                        "type": "objectid",
                        "required": true,
                        "immutable": true,
                        "unique": ["parent_id"]
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id",
                        "label": "Product"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "sort ascending"
                },
                "name_field": "product.name",
                "parent": "categories",
                "type": "collection",
                "label": "Category Product",
                "plural": "Category Products",
                "extends": "base",
                "triggers": [{
                    "id": "index_product_category_id",
                    "label": "Create Product Category Index",
                    "events": ["insert"],
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "url": "\/products\/{product_id}?category_index[sort][{parent_id}]={sort|1}",
                        "params": {
                            "category_index": {
                                "id": {
                                    "__D__push": "parent_id"
                                }
                            }
                        }
                    }]
                }, {
                    "id": "index_product_category_id",
                    "label": "Update Product Category Index",
                    "events": ["update"],
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "url": "\/products\/{product_id}?category_index[sort][{parent_id}]={sort|1}"
                    }]
                }, {
                    "id": "index_product_category_id_unset",
                    "label": "Remove Product Category Index",
                    "events": ["delete"],
                    "blocking": false,
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "url": "\/products\/{product_id}?$unset=category_index.sort.{parent_id}",
                        "params": {
                            "__D__pull": {
                                "category_index__S__id": "parent_id"
                            }
                        }
                    }]
                }],
                "searches": [{
                    "id": "default",
                    "proxy": {
                        "model": "products",
                        "key": "product_id",
                        "params": {
                            "category_index__S__id": "parent_id"
                        }
                    }
                }]
            },
            "products_indexed": {
                "type": "link",
                "url": "\/products?sort=category_index.sort.{id}+asc",
                "params": {
                    "category_index__S__id": "id"
                },
                "label": "Indexed Products",
                "description": "Products indexed by this category and ordered by their respective sort value"
            }
        },
        "id": "com.categories",
        "label": "Category",
        "name": "categories",
        "name_field": "name",
        "plural": "Categories",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "secondary_field": "slug",
        "version": "1.0.2-7"
    }, {
        "api": "com",
        "extends": "base",
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "name": {
                "type": "string",
                "label": "Contact Name",
                "formula": "if(salutation, salutation.label+' ', '') + if(first_name, first_name+' '+last_name, last_name)",
                "readonly": true
            },
            "first_name": {
                "type": "string"
            },
            "last_name": {
                "type": "string",
                "required": true
            },
            "salutation": {
                "type": "string",
                "enum": [{
                    "value": null,
                    "label": "N\/A"
                }, {
                    "value": "mr",
                    "label": "Mr."
                }, {
                    "value": "ms",
                    "label": "Ms."
                }, {
                    "value": "mrs",
                    "label": "Mrs."
                }, {
                    "value": "dr",
                    "label": "Dr."
                }, {
                    "value": "prof",
                    "label": "Prof."
                }]
            },
            "title": {
                "type": "string"
            },
            "department": {
                "type": "string"
            },
            "email": {
                "type": "string",
                "format": "email",
                "unique": true
            },
            "other_email": {
                "type": "string",
                "format": "email"
            },
            "email_optin": {
                "type": "bool"
            },
            "phone": {
                "type": "string",
                "format": "phone"
            },
            "other_phone": {
                "type": "string",
                "format": "phone"
            },
            "phone_optin": {
                "type": "bool"
            },
            "birthdate": {
                "type": "date"
            },
            "address1": {
                "type": "string",
                "label": "Address Line 1"
            },
            "address2": {
                "type": "string",
                "label": "Address Line 2"
            },
            "city": {
                "type": "string"
            },
            "state": {
                "type": "string",
                "label": "State\/Province"
            },
            "zip": {
                "type": "string",
                "label": "Zip\/Postal"
            },
            "country": {
                "type": "string",
                "length": 2
            },
            "notes": {
                "type": "string",
                "multiline": true,
                "label": "Private Notes"
            },
            "account_id": {
                "type": "objectid"
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            }
        },
        "id": "com.contacts",
        "label": "Contact",
        "name": "contacts",
        "name_field": "name",
        "plural": "Contacts",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "secondary_field": "email",
        "version": "1.0.2-1"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "coupons": {
                "tasks": {
                    "generate_codes": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "name": {
                "type": "string",
                "required": true,
                "label": "Coupon Name"
            },
            "description": {
                "type": "string",
                "multiline": true
            },
            "active": {
                "type": "bool",
                "default": false
            },
            "date_valid": {
                "type": "date",
                "label": "Valid From Date",
                "description": "The date a coupon is first available for use"
            },
            "date_expired": {
                "type": "date",
                "label": "Expires On Date",
                "description": "The date a coupon is considered expired and no longer available for use",
                "rules": [{
                    "expression": "and(date_valid, date_expired, date_expired \u003C= date_valid)",
                    "error": "Must occur after Valid From Date"
                }]
            },
            "use_total": {
                "type": "int",
                "default": 0,
                "label": "Use Count",
                "description": "Number of times a coupon has been used"
            },
            "limit_uses": {
                "type": "int",
                "label": "Max Total Uses",
                "description": "Maximum number of times a coupon may be applied"
            },
            "limit_code_uses": {
                "type": "int",
                "label": "Max Code Uses",
                "description": "Maximum number of times a coupon code may be used"
            },
            "limit_account_uses": {
                "type": "int",
                "label": "Max Account Uses",
                "description": "Maximum number of times a coupon may be used by each account"
            },
            "limit_account_groups": {
                "type": "array",
                "value_type": "string",
                "label": "Account Groups",
                "description": "Account groups that may apply a coupon to an order"
            },
            "limit_account_segments": {
                "type": "array",
                "value_type": "string",
                "label": "Account Segments",
                "description": "Account segments that may apply a coupon to an order"
            },
            "discounts": {
                "type": "array",
                "array_type": "object",
                "label": "Discount Rules",
                "description": "Discount rules used when a coupon is applied to an order",
                "fields": {
                    "type": {
                        "type": "string",
                        "label": "Rule Type",
                        "description": "Type of discount to apply",
                        "enum": [{
                            "value": "total",
                            "label": "Order Total"
                        }, {
                            "value": "shipment",
                            "label": "Shipment Total"
                        }, {
                            "value": "product",
                            "label": "Product"
                        }, {
                            "value": "category",
                            "label": "Category"
                        }],
                        "default": "total",
                        "required": false
                    },
                    "value_type": {
                        "type": "string",
                        "label": "Value Type",
                        "description": "Type of value to calculate discount amount",
                        "enum": [{
                            "value": "fixed",
                            "label": "Fixed"
                        }, {
                            "value": "percent",
                            "label": "Percent"
                        }],
                        "default": "fixed",
                        "required": true
                    },
                    "value": {
                        "type": "currency",
                        "label": "Amount",
                        "description": "Fixed value of discount"
                    },
                    "value_percent": {
                        "type": "float",
                        "scale": 2,
                        "label": "Percent",
                        "description": "Percentage value of discount"
                    },
                    "total_min": {
                        "type": "currency",
                        "label": "Min Order Total",
                        "description": "Minimum order total required for a rule to apply"
                    },
                    "price_min": {
                        "type": "currency",
                        "label": "Min Product Price",
                        "description": "Minimum product price required for a rule to apply"
                    },
                    "quantity_min": {
                        "type": "int",
                        "label": "Min Product Quantity",
                        "description": "Minimum product quantity required for a rule to apply"
                    },
                    "quantity_max": {
                        "type": "int",
                        "label": "Max Discount Quantity",
                        "description": "Maximum product quantity for which a rule will apply"
                    },
                    "product_id": {
                        "type": "objectid",
                        "description": "Product identifier for which a rule will apply"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "description": "Variant identifier for which a rule will apply"
                    },
                    "quantity_add": {
                        "type": "int",
                        "label": "Add Quantity",
                        "description": "Product quantity to add to an order if applicable"
                    },
                    "shipment_service": {
                        "type": "string",
                        "description": "Shipment service to apply discount if applicable"
                    },
                    "category_id": {
                        "type": "objectid",
                        "description": "Category identifier for which a rule will apply"
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    },
                    "category": {
                        "type": "link",
                        "model": "categories",
                        "key": "category_id"
                    }
                }
            },
            "codes": {
                "id": "com.coupons:codes",
                "name": "coupons:codes",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "coupons",
                        "key": "parent_id",
                        "label": " Coupon"
                    },
                    "code": {
                        "type": "string",
                        "unique": true,
                        "auto": true,
                        "increment": {
                            "start": 100001,
                            "pattern": {
                                "__D__formula": "alphanum(5) + code"
                            }
                        },
                        "format": "uppercase",
                        "label": "Code",
                        "description": "Unique code used to identify a coupon"
                    },
                    "use_total": {
                        "type": "int",
                        "default": 0,
                        "label": "Use Count",
                        "description": "Number of times a code has been used"
                    },
                    "gen_id": {
                        "type": "objectid",
                        "label": "Generation ID",
                        "description": "Generation identifier if generated automatically"
                    },
                    "orders": {
                        "type": "link",
                        "model": "orders",
                        "params": {
                            "coupon_code": "code"
                        }
                    },
                    "subscriptions": {
                        "type": "link",
                        "model": "subscriptions",
                        "params": {
                            "coupon_code": "code"
                        }
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "code",
                "parent": "coupons",
                "type": "collection",
                "label": "Coupon Code",
                "plural": "Coupon Codes",
                "extends": "base"
            },
            "multi_codes": {
                "type": "bool",
                "default": false,
                "label": "Multiple Coupon Codes",
                "description": "Indicates when a coupon is identified by multiple coupon codes"
            },
            "uses": {
                "id": "com.coupons:uses",
                "name": "coupons:uses",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "coupons",
                        "key": "parent_id",
                        "label": " Coupon"
                    },
                    "code": {
                        "type": "string",
                        "immutable": true,
                        "required": true
                    },
                    "code_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "account_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "order_id": {
                        "type": "objectid",
                        "immutable": true,
                        "unique": true
                    },
                    "order": {
                        "type": "link",
                        "model": "orders",
                        "key": "order_id"
                    },
                    "subscription_id": {
                        "type": "objectid",
                        "immutable": true,
                        "unique": true
                    },
                    "subscription": {
                        "type": "link",
                        "model": "subscriptions",
                        "key": "subscription_id"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "code",
                "parent": "coupons",
                "type": "collection",
                "label": "Code Use",
                "plural": "Code Uses",
                "extends": "base",
                "triggers": [{
                    "id": "update_coupon_use_total",
                    "label": "Update Coupon Use Total",
                    "events": ["post.result", "delete.result"],
                    "include": {
                        "use_total": {
                            "url": "\/coupons:uses\/:count",
                            "params": {
                                "where": {
                                    "parent_id": "parent_id"
                                }
                            }
                        }
                    },
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "model": "coupons",
                        "key": "parent_id",
                        "params": {
                            "use_total": "use_total"
                        }
                    }]
                }, {
                    "id": "update_code_use_total",
                    "label": "Update Code Use Total",
                    "events": ["post.result", "delete.result"],
                    "include": {
                        "use_total": {
                            "url": "\/coupons:uses\/:count",
                            "params": {
                                "where": {
                                    "code_id": "code_id"
                                }
                            }
                        }
                    },
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "model": "coupons:codes",
                        "key": "code_id",
                        "params": {
                            "use_total": "use_total"
                        }
                    }]
                }]
            },
            "generations": {
                "id": "com.coupons:generations",
                "name": "coupons:generations",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "coupons",
                        "key": "parent_id",
                        "label": " Coupon"
                    },
                    "count": {
                        "type": "int",
                        "min": 10,
                        "max": 10000,
                        "default": 0,
                        "required": true,
                        "immutable": true,
                        "label": "Code Count",
                        "description": "Number of codes to generate"
                    },
                    "pattern_type": {
                        "type": "string",
                        "enum": [{
                            "value": "default",
                            "label": "Default"
                        }, {
                            "value": "custom",
                            "label": "Custom Pattern"
                        }],
                        "default": "default",
                        "label": "Code Pattern Type",
                        "description": "Pattern type used to generate codes"
                    },
                    "pattern": {
                        "type": "string",
                        "label": "Code Pattern",
                        "description": "Custom code pattern used to generate new codes"
                    },
                    "complete": {
                        "type": "bool",
                        "default": false,
                        "description": "Indicates when code generation is complete"
                    },
                    "error": {
                        "type": "string",
                        "description": "Message returned by code generation process if an error occurs"
                    },
                    "codes": {
                        "type": "link",
                        "model": "coupons:codes",
                        "params": {
                            "gen_id": "id"
                        }
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "id",
                "parent": "coupons",
                "type": "collection",
                "label": "Code Generation",
                "plural": "Code Generations",
                "extends": "base",
                "name_pattern": "{parent.name}"
            },
            "orders": {
                "type": "link",
                "model": "orders",
                "params": {
                    "coupon_id": "id"
                }
            },
            "subscriptions": {
                "type": "link",
                "model": "subscriptions",
                "params": {
                    "coupon_id": "id"
                }
            },
            "active_generations": {
                "type": "link",
                "model": "coupons:generations",
                "params": {
                    "parent_id": "id"
                },
                "data": {
                    "complete": false
                }
            },
            "currency": {
                "type": "string",
                "length": 3
            }
        },
        "id": "com.coupons",
        "label": "Coupon",
        "name": "coupons",
        "name_field": "name",
        "plural": "Coupons",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "version": "1.0.2-7"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "credits": {
                "methods": {
                    "create_from_order": true,
                    "create_from_subscription": true,
                    "update_order_items": true,
                    "update_credit_totals": true,
                    "update_refund_totals": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "immutable": true,
                "unique": true,
                "auto": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Credit Memo Number"
            },
            "items": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "quantity": {
                        "type": "int",
                        "default": 1,
                        "min": 1
                    },
                    "price": {
                        "type": "currency",
                        "immutable": true
                    },
                    "price_total": {
                        "type": "currency",
                        "formula": "price * quantity"
                    },
                    "restock": {
                        "type": "bool"
                    },
                    "options": {
                        "type": "array",
                        "value_type": "object",
                        "immutable": true,
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "value": {
                                "type": "string"
                            }
                        }
                    },
                    "bundle_items": {
                        "type": "array",
                        "value_type": "object",
                        "immutable": true,
                        "fields": {
                            "id": {
                                "type": "objectid"
                            },
                            "quantity": {
                                "type": "int"
                            },
                            "quantity_total": {
                                "type": "int"
                            },
                            "product_id": {
                                "type": "objectid"
                            },
                            "product": {
                                "type": "link",
                                "model": "products",
                                "key": "product_id"
                            },
                            "variant_id": {
                                "type": "objectid"
                            },
                            "variant": {
                                "type": "link",
                                "model": "products:variants",
                                "key": "variant_id"
                            }
                        }
                    },
                    "discount_total": {
                        "type": "currency",
                        "immutable": true
                    },
                    "discount_each": {
                        "type": "currency",
                        "immutable": true
                    },
                    "tax_total": {
                        "type": "currency",
                        "immutable": true
                    },
                    "tax_each": {
                        "type": "currency",
                        "immutable": true
                    },
                    "product_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            },
            "notes": {
                "type": "string",
                "multiline": true,
                "label": "Private Notes"
            },
            "notified": {
                "type": "bool",
                "default": false
            },
            "refunded": {
                "type": "bool",
                "default": false,
                "readonly": true,
                "formula": "if(and(refund_total \u003E 0, refund_due \u003C= 0), true, false)"
            },
            "void": {
                "type": "bool",
                "immutable": true,
                "rules": [{
                    "expression": "and(void, refund_total \u003E 0)",
                    "error": "Cannot void after refund applied"
                }]
            },
            "status": {
                "type": "string",
                "default": "pending",
                "auto": true,
                "readonly": true,
                "enum": [{
                    "value": "pending",
                    "label": "Pending"
                }, {
                    "value": "void",
                    "label": "Void",
                    "conditions": {
                        "void": true
                    }
                }, {
                    "value": "refunded",
                    "label": "Refunded",
                    "conditions": {
                        "refunded": true
                    }
                }]
            },
            "sub_total": {
                "type": "currency",
                "formula": "sum(items.price_total)"
            },
            "item_discount": {
                "type": "currency",
                "formula": "sum(items.discount_total)"
            },
            "item_tax": {
                "type": "currency",
                "formula": "sum(items.tax_total)"
            },
            "item_tax_included": {
                "type": "bool"
            },
            "item_quantity": {
                "type": "int",
                "formula": "sum(items.quantity)"
            },
            "discount_total": {
                "type": "currency",
                "formula": "item_discount"
            },
            "shipment_total": {
                "type": "currency",
                "immutable": true
            },
            "shipment_tax": {
                "type": "currency",
                "immutable": true
            },
            "shipment_tax_included": {
                "type": "bool"
            },
            "shipment_tax_included_total": {
                "type": "currency",
                "formula": "shipment_total + if(shipment_tax_included, 0, shipment_tax)"
            },
            "tax_total": {
                "type": "currency",
                "formula": "item_tax + shipment_tax"
            },
            "tax_included_total": {
                "type": "currency",
                "formula": "if(item_tax_included, 0, item_tax) + if(shipment_tax_included, 0, shipment_tax)"
            },
            "extra_credit": {
                "type": "currency",
                "description": "Extra credit amount in addition to item and shipping amounts"
            },
            "restock_fee": {
                "type": "currency",
                "label": "Re-stock Fee",
                "description": "Amount to subtract from a credit for restocking purposes"
            },
            "grand_total": {
                "type": "currency",
                "formula": "sub_total + shipment_total + tax_included_total + extra_credit - (restock_fee) - (discount_total)",
                "rounded": true
            },
            "refund_total": {
                "type": "currency",
                "readonly": true
            },
            "refund_due": {
                "type": "currency",
                "formula": "if(and(not(void), not(invoice_id)), grand_total - refund_total, 0)"
            },
            "order_id": {
                "type": "objectid",
                "immutable": true
            },
            "order": {
                "type": "link",
                "model": "orders",
                "key": "order_id"
            },
            "subscription_id": {
                "type": "objectid",
                "immutable": true
            },
            "subscription": {
                "type": "link",
                "model": "subscriptions",
                "key": "subscription_id"
            },
            "date_period_start": {
                "type": "date",
                "default": {
                    "__D__formula": "if(subscription_id, subscription.date_period_start)"
                },
                "label": "Period Start"
            },
            "date_period_end": {
                "type": "date",
                "default": {
                    "__D__formula": "if(subscription_id, subscription.date_period_end)"
                },
                "label": "Period End"
            },
            "source_model": {
                "type": "string",
                "formula": "if(order_id, 'orders', if(subscription_id, 'subscriptions'))",
                "readonly": true
            },
            "source_id": {
                "type": "objectid",
                "formula": "or(order_id, subscription_id)",
                "readonly": true
            },
            "source": {
                "type": "link",
                "url": "\/{source_model}\/{source_id}"
            },
            "account_id": {
                "type": "objectid",
                "default": {
                    "__D__formula": "source.account_id"
                },
                "immutable": true,
                "required": true
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            },
            "invoice_id": {
                "type": "objectid",
                "immutable": true
            },
            "invoice": {
                "type": "link",
                "model": "invoices",
                "key": "invoice_id"
            },
            "refunds": {
                "type": "link",
                "model": "payments:refunds",
                "params": {
                    "credit_id": "id"
                }
            },
            "currency": {
                "type": "string",
                "length": 3
            }
        },
        "id": "com.credits",
        "label": "Credit Memo",
        "name": "credits",
        "name_field": "number",
        "plural": "Credit Memos",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "secondary_field": "number",
        "triggers": [],
        "version": "1.0.2-6"
    }, {
        "api": "com",
        "development": true,
        "extends": "base",
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            }
        },
        "id": "com.downloads",
        "label": "Download",
        "name": "downloads",
        "name_field": "id",
        "plural": "Downloads",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "version": "1.0.2-3"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "invoices": {
                "methods": {
                    "create_from_order": true,
                    "create_from_subscription": true,
                    "update_order_items": true,
                    "update_payment_totals": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "unique": true,
                "auto": true,
                "immutable": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Invoice Number"
            },
            "currency": {
                "immutable": true,
                "type": "string",
                "length": 3
            },
            "items": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "quantity": {
                        "type": "int",
                        "default": 1,
                        "min": 1
                    },
                    "price": {
                        "type": "currency",
                        "immutable": true
                    },
                    "price_total": {
                        "type": "currency",
                        "formula": "price * quantity"
                    },
                    "options": {
                        "type": "array",
                        "value_type": "object",
                        "immutable": true,
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "value": {
                                "type": "string"
                            }
                        }
                    },
                    "bundle_items": {
                        "type": "array",
                        "value_type": "object",
                        "immutable": true,
                        "fields": {
                            "id": {
                                "type": "objectid"
                            },
                            "quantity": {
                                "type": "int"
                            },
                            "quantity_total": {
                                "type": "int"
                            },
                            "product_id": {
                                "type": "objectid"
                            },
                            "product": {
                                "type": "link",
                                "model": "products",
                                "key": "product_id"
                            },
                            "variant_id": {
                                "type": "objectid"
                            },
                            "variant": {
                                "type": "link",
                                "model": "products:variants",
                                "key": "variant_id"
                            }
                        }
                    },
                    "quantity_credited": {
                        "type": "int",
                        "default": 0,
                        "label": "Quantity Credited"
                    },
                    "quantity_creditable": {
                        "type": "int",
                        "formula": "if(price \u003E 0, quantity - quantity_credited, 0)",
                        "label": "Quantity Creditable"
                    },
                    "discount_total": {
                        "type": "currency",
                        "immutable": true
                    },
                    "discount_each": {
                        "type": "currency",
                        "immutable": true
                    },
                    "tax_total": {
                        "type": "currency",
                        "immutable": true
                    },
                    "tax_each": {
                        "type": "currency",
                        "immutable": true
                    },
                    "product_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            },
            "net_days": {
                "type": "int"
            },
            "date_due": {
                "type": "date"
            },
            "notes": {
                "type": "string",
                "multiline": true,
                "label": "Private Notes"
            },
            "paid": {
                "type": "bool",
                "default": false,
                "readonly": true,
                "formula": "if(payment_due \u003C= 0, true, false)"
            },
            "pastdue": {
                "type": "bool",
                "default": false,
                "readonly": true
            },
            "void": {
                "type": "bool",
                "immutable": true,
                "rules": [{
                    "expression": "if(void, payment_total \u003E 0)",
                    "error": "Cannot void if payment has been applied"
                }]
            },
            "closed": {
                "type": "bool",
                "default": false
            },
            "status": {
                "type": "string",
                "default": "pending",
                "readonly": true,
                "auto": true,
                "enum": [{
                    "value": "pending",
                    "label": "Pending",
                    "conditions": {
                        "paid": false,
                        "closed": false,
                        "void": null
                    }
                }, {
                    "value": "void",
                    "label": "Void",
                    "conditions": {
                        "void": true
                    }
                }, {
                    "value": "paid",
                    "label": "Paid",
                    "conditions": {
                        "paid": true
                    }
                }, {
                    "value": "unpaid",
                    "label": "Unpaid",
                    "conditions": {
                        "paid": false,
                        "closed": true
                    }
                }]
            },
            "sub_total": {
                "type": "currency",
                "formula": "sum(items.price_total)"
            },
            "item_discount": {
                "type": "currency",
                "formula": "sum(items.discount_total)"
            },
            "item_tax": {
                "type": "currency",
                "formula": "sum(items.tax_total)"
            },
            "item_tax_included": {
                "type": "bool"
            },
            "item_quantity": {
                "type": "int",
                "formula": "sum(items.quantity)"
            },
            "item_quantity_creditable": {
                "type": "int",
                "formula": "sum(items.quantity_creditable)"
            },
            "discount_total": {
                "type": "currency",
                "formula": "item_discount"
            },
            "shipment_total": {
                "type": "currency",
                "immutable": true
            },
            "shipment_tax": {
                "type": "currency",
                "immutable": true
            },
            "shipment_tax_included": {
                "type": "bool"
            },
            "shipment_tax_included_total": {
                "type": "currency",
                "formula": "shipment_total + if(shipment_tax_included, 0, shipment_tax)"
            },
            "tax_total": {
                "type": "currency",
                "formula": "item_tax + shipment_tax"
            },
            "tax_included_total": {
                "type": "currency",
                "formula": "if(item_tax_included, 0, item_tax) + if(shipment_tax_included, 0, shipment_tax)"
            },
            "grand_total": {
                "type": "currency",
                "formula": "sub_total + tax_included_total + shipment_total - (discount_total)",
                "rounded": true
            },
            "payment_total": {
                "type": "currency",
                "readonly": true
            },
            "credit_total": {
                "type": "currency",
                "readonly": true
            },
            "payment_due": {
                "type": "currency",
                "formula": "if(not(void), grand_total - credit_total - payment_total, 0)"
            },
            "payment_error": {
                "type": "string"
            },
            "payment_retry_count": {
                "type": "int"
            },
            "payment_retry_resolve": {
                "type": "int"
            },
            "date_payment_retry": {
                "type": "date",
                "label": "Next Attempt"
            },
            "order_id": {
                "type": "objectid",
                "immutable": true
            },
            "order": {
                "type": "link",
                "model": "orders",
                "key": "order_id"
            },
            "subscription_id": {
                "type": "objectid",
                "immutable": true
            },
            "subscription": {
                "type": "link",
                "model": "subscriptions",
                "key": "subscription_id"
            },
            "date_period_start": {
                "type": "date",
                "default": {
                    "__D__formula": "if(subscription_id, subscription.date_period_start)"
                },
                "label": "Period Start"
            },
            "date_period_end": {
                "type": "date",
                "default": {
                    "__D__formula": "if(subscription_id, subscription.date_period_end)"
                },
                "label": "Period End"
            },
            "source_model": {
                "type": "string",
                "formula": "if(order_id, 'orders', if(subscription_id, 'subscriptions'))",
                "readonly": true
            },
            "source_id": {
                "type": "objectid",
                "formula": "or(order_id, subscription_id)",
                "readonly": true
            },
            "source": {
                "type": "link",
                "url": "\/{source_model}\/{source_id}"
            },
            "account_id": {
                "type": "objectid",
                "default": {
                    "__D__formula": "source.account_id"
                },
                "immutable": true,
                "required": true
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            },
            "payments": {
                "type": "link",
                "model": "payments",
                "params": {
                    "invoice_id": "id"
                }
            },
            "refunds": {
                "type": "link",
                "model": "payments:refunds",
                "params": {
                    "invoice_id": "id"
                }
            },
            "credits": {
                "type": "link",
                "model": "credits",
                "params": {
                    "invoice_id": "id"
                }
            }
        },
        "id": "com.invoices",
        "label": "Invoice",
        "name": "invoices",
        "name_field": "number",
        "plural": "Invoices",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "secondary_field": "number",
        "triggers": [],
        "version": "1.0.2-4"
    }, {
        "api": "com",
        "features": {
            "admin__S__notifications": {
                "tasks": {
                    "send": true,
                    "send_delayed": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "template": {
                "type": "string",
                "required": true,
                "description": "Notification template name"
            },
            "record_id": {
                "type": "string",
                "required": true,
                "description": "Record ID of the collection for which the notification template is defined"
            },
            "record": {
                "type": "link",
                "url": "\/{config.model}\/{record_id}"
            },
            "contact": {
                "type": "string",
                "description": "Notification contact address if applicable"
            },
            "error": {
                "type": "string",
                "description": "Error message returned by sending process if applicable"
            },
            "config": {
                "type": "link",
                "model": ":notifications",
                "key": "template"
            }
        },
        "id": "com.notifications",
        "label": "Notification",
        "name": "notifications",
        "plural": "Notifications",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 10,
            "sort": "id desc"
        },
        "version": "1.0.2-6"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "orders": {
                "methods": {
                    "convert_cart": true,
                    "authorize_payment": true,
                    "combine_items": true,
                    "default_items": true,
                    "default_account": true,
                    "default_shipping": true,
                    "rate_shipment": true,
                    "apply_coupon": true,
                    "apply_taxes": true,
                    "consume_stock": true,
                    "cancel_items": true,
                    "cancel_stock": true,
                    "invoice_payment": true
                },
                "tasks": {
                    "create_scheduled": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "unique": true,
                "auto": true,
                "immutable": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Order Number"
            },
            "currency": {
                "immutable": true,
                "type": "string",
                "length": 3
            },
            "cart_id": {
                "type": "objectid",
                "immutable": true
            },
            "cart": {
                "type": "link",
                "model": "carts",
                "key": "cart_id"
            },
            "items": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "auto": true,
                        "immutable": true
                    },
                    "quantity": {
                        "type": "int",
                        "default": 1,
                        "min": 1
                    },
                    "price": {
                        "type": "currency",
                        "default": {
                            "__D__formula": "if(product_id, product.price)"
                        }
                    },
                    "orig_price": {
                        "type": "currency"
                    },
                    "price_total": {
                        "type": "currency",
                        "formula": "price * quantity"
                    },
                    "delivery": {
                        "type": "string",
                        "enum": ["shipment", "download"],
                        "default": {
                            "__D__formula": "if(product_id, product.delivery)"
                        },
                        "immutable": true
                    },
                    "options": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "value": {
                                "type": "string"
                            }
                        }
                    },
                    "bundle_items": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "objectid"
                            },
                            "quantity": {
                                "type": "int",
                                "default": 1
                            },
                            "quantity_total": {
                                "type": "int",
                                "label": "Bundled Quantity"
                            },
                            "product_id": {
                                "type": "objectid",
                                "required": true
                            },
                            "product": {
                                "type": "link",
                                "model": "products",
                                "key": "product_id"
                            },
                            "delivery": {
                                "type": "string",
                                "enum": ["shipment", "download"],
                                "default": {
                                    "__D__formula": "if(product_id, product.delivery)"
                                },
                                "immutable": true
                            },
                            "shipment_weight": {
                                "type": "float",
                                "scale": 1
                            },
                            "quantity_consumed": {
                                "type": "int"
                            },
                            "quantity_canceled": {
                                "type": "int"
                            },
                            "quantity_delivered": {
                                "type": "int",
                                "default": 0
                            },
                            "quantity_deliverable": {
                                "type": "int",
                                "formula": "if(delivery, quantity_total - quantity_delivered - quantity_canceled, 0)"
                            },
                            "quantity_shipment_deliverable": {
                                "type": "int",
                                "formula": "if(delivery == 'shipment', quantity - quantity_delivered - quantity_credited - quantity_canceled)"
                            },
                            "quantity_download_deliverable": {
                                "type": "int",
                                "formula": "if(delivery == 'download', quantity - quantity_delivered - quantity_credited - quantity_canceled)"
                            },
                            "quantity_returned": {
                                "type": "int"
                            }
                        }
                    },
                    "shipment_weight": {
                        "type": "float",
                        "scale": 1
                    },
                    "quantity_invoiced": {
                        "type": "int",
                        "default": 0
                    },
                    "quantity_invoiceable": {
                        "type": "int",
                        "formula": "if((price_total - discount_total \u003E 0), quantity - quantity_invoiced - quantity_canceled, 0)"
                    },
                    "quantity_credited": {
                        "type": "int",
                        "default": 0
                    },
                    "quantity_creditable": {
                        "type": "int",
                        "formula": "if((price_total - discount_total \u003E 0), quantity - quantity_credited - quantity_canceled, 0)"
                    },
                    "quantity_consumed": {
                        "type": "int"
                    },
                    "quantity_canceled": {
                        "type": "int"
                    },
                    "quantity_delivered": {
                        "type": "int",
                        "default": 0
                    },
                    "quantity_deliverable": {
                        "type": "int",
                        "formula": "if(or(delivery, sum(bundle_items.quantity_deliverable)), quantity - quantity_delivered - quantity_credited - quantity_canceled, 0)"
                    },
                    "quantity_shipment_deliverable": {
                        "type": "int",
                        "formula": "if(or(delivery == 'shipment', sum(bundle_items.quantity_shipment_deliverable)), quantity - quantity_delivered - quantity_credited - quantity_canceled)"
                    },
                    "quantity_download_deliverable": {
                        "type": "int",
                        "formula": "if(or(delivery == 'download', sum(bundle_items.quantity_download_deliverable)), quantity - quantity_delivered - quantity_credited - quantity_canceled)"
                    },
                    "quantity_returned": {
                        "type": "int"
                    },
                    "discounts": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "amount": {
                                "type": "currency"
                            }
                        }
                    },
                    "discount_total": {
                        "type": "currency",
                        "formula": "sum(discounts.amount)"
                    },
                    "discount_each": {
                        "type": "currency",
                        "formula": "discount_total \/ quantity",
                        "label": "Discount Amount"
                    },
                    "taxes": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "amount": {
                                "type": "currency"
                            }
                        }
                    },
                    "tax_total": {
                        "type": "currency",
                        "formula": "sum(taxes.amount)"
                    },
                    "tax_each": {
                        "type": "currency",
                        "formula": "tax_total \/ quantity",
                        "label": "Tax Amount"
                    },
                    "product_id": {
                        "type": "objectid",
                        "required": true,
                        "immutable": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    }
                }
            },
            "discounts": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": ["sale", "coupon"]
                    },
                    "rule": {
                        "type": "object"
                    },
                    "amount": {
                        "type": "currency"
                    }
                }
            },
            "taxes": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "shipping": {
                        "type": "bool"
                    },
                    "priority": {
                        "type": "int"
                    },
                    "rate": {
                        "type": "float",
                        "scale": 3
                    },
                    "amount": {
                        "type": "currency"
                    }
                }
            },
            "billing": {
                "type": "object",
                "fields": {
                    "name": {
                        "type": "string",
                        "label": "Billing Name"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "phone": {
                        "type": "string",
                        "format": "phone",
                        "label": "Phone Number"
                    },
                    "method": {
                        "type": "string",
                        "label": "Payment Method"
                    },
                    "card": {
                        "type": "object",
                        "label": "Payment Card",
                        "fields": {
                            "token": {
                                "type": "string",
                                "required": true
                            },
                            "exp_month": {
                                "type": "int"
                            },
                            "exp_year": {
                                "type": "int"
                            },
                            "brand": {
                                "type": "string"
                            },
                            "last4": {
                                "type": "string"
                            },
                            "gateway": {
                                "type": "string"
                            },
                            "test": {
                                "type": "bool"
                            },
                            "address_check": {
                                "type": "string"
                            },
                            "zip_check": {
                                "type": "string"
                            },
                            "cvc_check": {
                                "type": "string"
                            }
                        }
                    },
                    "account_card_id": {
                        "type": "objectid"
                    },
                    "account_card": {
                        "type": "link",
                        "model": "accounts:cards",
                        "key": "account_card_id"
                    }
                }
            },
            "shipping": {
                "type": "object",
                "fields": {
                    "name": {
                        "type": "string",
                        "label": "Shipping Name"
                    },
                    "address1": {
                        "type": "string",
                        "label": "Address Line 1"
                    },
                    "address2": {
                        "type": "string",
                        "label": "Address Line 2"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string",
                        "label": "State\/Province"
                    },
                    "zip": {
                        "type": "string",
                        "label": "Zip\/Postal Code"
                    },
                    "country": {
                        "type": "string",
                        "length": 2
                    },
                    "phone": {
                        "type": "string",
                        "label": "Phone Number"
                    },
                    "service": {
                        "type": "string",
                        "label": "Shipping Service ID"
                    },
                    "service_name": {
                        "type": "string",
                        "label": "Shipping Service Name"
                    },
                    "price": {
                        "type": "currency",
                        "label": "Shipping Price"
                    },
                    "account_address_id": {
                        "type": "objectid"
                    },
                    "account_addresses": {
                        "type": "link",
                        "model": "accounts:addresses",
                        "key": "account_address_id"
                    }
                }
            },
            "shipment_rating": {
                "type": "object",
                "fields": {
                    "date_created": {
                        "type": "date",
                        "auto": true
                    },
                    "fingerprint": {
                        "type": "string"
                    },
                    "services": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "carrier": {
                                "type": "string"
                            },
                            "price": {
                                "type": "currency"
                            }
                        }
                    },
                    "errors": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "message": {
                                "type": "string"
                            },
                            "code": {
                                "type": "string"
                            }
                        }
                    }
                }
            },
            "schedule": {
                "type": "object",
                "fields": {
                    "interval": {
                        "type": "string",
                        "enum": [{
                            "value": "monthly",
                            "label": "Monthly"
                        }, {
                            "value": "daily",
                            "label": "Daily"
                        }, {
                            "value": "weekly",
                            "label": "Weekly"
                        }, {
                            "value": "yearly",
                            "label": "Yearly"
                        }]
                    },
                    "interval_count": {
                        "type": "int"
                    }
                }
            },
            "date_scheduled": {
                "type": "date",
                "formula": "date_next_interval(interval, date_created, interval_count)",
                "readonly": true
            },
            "notes": {
                "type": "string",
                "multiline": true,
                "label": "Private Notes"
            },
            "comments": {
                "type": "string",
                "multiline": true,
                "label": "Customer Comments"
            },
            "draft": {
                "type": "bool"
            },
            "paid": {
                "type": "bool",
                "default": false,
                "readonly": true,
                "formula": "if(and(not(draft), not(canceled), payment_balance \u003E= 0), true, false)"
            },
            "delivered": {
                "type": "bool",
                "default": false,
                "readonly": true,
                "formula": "if(and(not(draft), item_quantity_delivered \u003E 0, item_quantity_deliverable \u003C= 0), true, false)"
            },
            "hold": {
                "type": "bool",
                "default": false
            },
            "canceled": {
                "type": "bool",
                "immutable": true
            },
            "closed": {
                "type": "bool",
                "default": false
            },
            "status": {
                "type": "string",
                "default": "pending",
                "readonly": true,
                "auto": true,
                "enum": [{
                    "value": "pending",
                    "label": "Pending"
                }, {
                    "value": "draft",
                    "label": "Draft",
                    "conditions": {
                        "draft": true,
                        "canceled": null
                    }
                }, {
                    "value": "payment_pending",
                    "label": "Payment Pending",
                    "conditions": {
                        "paid": false,
                        "hold": false,
                        "canceled": null,
                        "closed": false,
                        "items": {
                            "__D__ne": null
                        }
                    }
                }, {
                    "value": "delivery_pending",
                    "label": "Delivery Pending",
                    "conditions": {
                        "paid": true,
                        "delivered": false,
                        "item_quantity_deliverable": {
                            "__D__gt": 0
                        },
                        "hold": false,
                        "canceled": null,
                        "closed": false
                    }
                }, {
                    "value": "hold",
                    "label": "Hold",
                    "conditions": {
                        "hold": true,
                        "canceled": null
                    }
                }, {
                    "value": "complete",
                    "label": "Complete",
                    "conditions": {
                        "paid": true,
                        "hold": false,
                        "canceled": null,
                        "item_quantity_deliverable": {
                            "__D__lte": 0
                        }
                    }
                }, {
                    "value": "canceled",
                    "label": "Canceled",
                    "conditions": {
                        "canceled": true
                    }
                }]
            },
            "sub_total": {
                "type": "currency",
                "formula": "sum(items.price_total)"
            },
            "item_discount": {
                "type": "currency",
                "formula": "sum(items.discount_total)"
            },
            "item_tax": {
                "type": "currency",
                "formula": "sum(items.tax_total)"
            },
            "item_tax_included": {
                "type": "bool"
            },
            "item_quantity": {
                "type": "int",
                "formula": "sum(items.quantity)"
            },
            "item_quantity_canceled": {
                "type": "int",
                "formula": "sum(items.quantity_canceled)"
            },
            "item_quantity_delivered": {
                "type": "int",
                "formula": "sum(items.quantity_delivered)"
            },
            "item_quantity_deliverable": {
                "type": "int",
                "formula": "sum(items.quantity_deliverable)"
            },
            "item_quantity_shipment_deliverable": {
                "type": "int",
                "formula": "if(shipment_delivery, sum(items.quantity_shipment_deliverable))"
            },
            "item_quantity_download_deliverable": {
                "type": "int",
                "formula": "if(download_delivery, sum(items.quantity_download_deliverable))"
            },
            "item_quantity_invoiced": {
                "type": "int",
                "formula": "sum(items.quantity_invoiced)"
            },
            "item_quantity_invoiceable": {
                "type": "int",
                "formula": "sum(items.quantity_invoiceable)"
            },
            "item_quantity_credited": {
                "type": "int",
                "formula": "sum(items.quantity_credited)"
            },
            "item_quantity_creditable": {
                "type": "int",
                "formula": "sum(items.quantity_creditable)"
            },
            "item_shipment_weight": {
                "type": "float",
                "scale": 1,
                "formula": "sum(items.shipment_weight)"
            },
            "discount_total": {
                "type": "currency",
                "formula": "item_discount"
            },
            "shipment_price": {
                "type": "currency",
                "formula": "shipping.price"
            },
            "shipment_discount": {
                "type": "currency"
            },
            "shipment_total": {
                "type": "currency",
                "formula": "shipment_price - shipment_discount"
            },
            "shipment_tax": {
                "type": "currency"
            },
            "shipment_tax_included": {
                "type": "bool"
            },
            "shipment_tax_included_total": {
                "type": "currency",
                "formula": "shipment_total + if(shipment_tax_included, 0, shipment_tax)"
            },
            "tax_total": {
                "type": "currency",
                "formula": "item_tax + shipment_tax"
            },
            "tax_included_total": {
                "type": "currency",
                "formula": "if(item_tax_included, 0, item_tax) + if(shipment_tax_included, 0, shipment_tax)"
            },
            "grand_total": {
                "type": "currency",
                "formula": "sub_total + shipment_total + tax_included_total - (discount_total)",
                "rounded": true
            },
            "shipment_total_invoiced": {
                "type": "currency",
                "readonly": true
            },
            "shipment_total_credited": {
                "type": "currency",
                "readonly": true
            },
            "credit_total": {
                "type": "currency",
                "readonly": true
            },
            "payment_total": {
                "type": "currency",
                "readonly": true
            },
            "refund_total": {
                "type": "currency",
                "readonly": true
            },
            "payment_balance": {
                "type": "currency",
                "formula": "payment_total - refund_total - grand_total + (credit_total)"
            },
            "coupon_code": {
                "type": "string"
            },
            "coupon_id": {
                "type": "objectid"
            },
            "coupon": {
                "type": "link",
                "model": "coupons",
                "key": "coupon_id"
            },
            "authorized_payment_id": {
                "type": "string"
            },
            "authorized_payment": {
                "type": "link",
                "model": "payments",
                "key": "authorized_payment_id"
            },
            "parent_id": {
                "type": "objectid",
                "immutable": true
            },
            "parent": {
                "type": "link",
                "model": "orders",
                "key": "parent_id"
            },
            "prev_id": {
                "type": "objectid",
                "immutable": true
            },
            "prev": {
                "type": "link",
                "model": "orders",
                "key": "prev_id"
            },
            "next_id": {
                "type": "objectid",
                "immutable": true
            },
            "next": {
                "type": "link",
                "model": "orders",
                "key": "next_id"
            },
            "account_id": {
                "type": "objectid",
                "immutable": true,
                "required": true
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            },
            "shipment_delivery": {
                "type": "bool",
                "readonly": true,
                "description": "Indicates an order contains at least one item to be delivered by Shipment"
            },
            "download_delivery": {
                "type": "bool",
                "readonly": true,
                "description": "Indicates an order contains at least one item to be delivered by Download"
            },
            "shipments": {
                "type": "link",
                "model": "shipments",
                "params": {
                    "order_id": "id"
                }
            },
            "downloads": {
                "type": "link",
                "model": "downloads",
                "params": {
                    "order_id": "id"
                }
            },
            "invoices": {
                "type": "link",
                "model": "invoices",
                "params": {
                    "order_id": "id"
                }
            },
            "pending_invoices": {
                "type": "link",
                "model": "invoices",
                "params": {
                    "order_id": "id"
                },
                "data": {
                    "status": "pending"
                }
            },
            "credits": {
                "type": "link",
                "model": "credits",
                "params": {
                    "order_id": "id"
                }
            },
            "pending_credits": {
                "type": "link",
                "model": "credits",
                "params": {
                    "order_id": "id"
                },
                "data": {
                    "status": "pending"
                }
            },
            "payments": {
                "type": "link",
                "model": "payments",
                "params": {
                    "order_id": "id"
                }
            },
            "refunds": {
                "type": "link",
                "model": "payments:refunds",
                "params": {
                    "order_id": "id"
                }
            },
            "notifications": {
                "type": "link",
                "model": "notifications",
                "params": {
                    "record_id": "id"
                }
            }
        },
        "id": "com.orders",
        "label": "Order",
        "name": "orders",
        "name_field": "number",
        "plural": "Orders",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "searches": [{
            "id": "default",
            "fields": ["number", "billing.name", "shipping.name"]
        }],
        "secondary_field": "number",
        "triggers": [],
        "version": "1.0.2-20"
    }, {
        "api": "com",
        "extends": "base",
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "name": {
                "type": "string",
                "required": true
            },
            "slug": {
                "type": "string",
                "format": "slug",
                "default": {
                    "__D__formula": "slug(name)"
                }
            },
            "content": {
                "type": "string",
                "format": "html",
                "multiline": true
            },
            "published": {
                "type": "bool",
                "default": false
            },
            "date_published": {
                "type": "date",
                "label": "Publish Date"
            },
            "meta_title": {
                "type": "string",
                "label": "Page Title"
            },
            "meta_keywords": {
                "type": "string"
            },
            "meta_description": {
                "type": "string",
                "multiline": true
            },
            "redirect": {
                "type": "string",
                "format": "url"
            },
            "template": {
                "type": "string"
            },
            "listing": {
                "type": "bool",
                "label": "Article Listing",
                "description": "Determines whether a page is a listing of articles"
            },
            "articles": {
                "id": "com.pages:articles",
                "name": "pages:articles",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "pages",
                        "key": "parent_id",
                        "label": " Page"
                    },
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "slug": {
                        "type": "string",
                        "format": "slug",
                        "default": {
                            "__D__formula": "slug(name)"
                        }
                    },
                    "content": {
                        "type": "string",
                        "format": "html",
                        "multiline": true
                    },
                    "tags": {
                        "type": "array",
                        "value_type": "string",
                        "unique": true
                    },
                    "published": {
                        "type": "bool",
                        "default": false
                    },
                    "date_published": {
                        "type": "date",
                        "label": "Publish Date"
                    },
                    "meta_title": {
                        "type": "string",
                        "label": "Page Title"
                    },
                    "meta_keywords": {
                        "type": "string"
                    },
                    "meta_description": {
                        "type": "string",
                        "multiline": true
                    },
                    "redirect": {
                        "type": "string",
                        "format": "url"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "name",
                "parent": "pages",
                "type": "collection",
                "label": "Page Article",
                "plural": "Page Articles",
                "extends": "base",
                "secondary_field": "slug"
            }
        },
        "id": "com.pages",
        "label": "Page",
        "name": "pages",
        "name_field": "name",
        "plural": "Pages",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "name asc"
        },
        "secondary_field": "slug",
        "version": "1.0.1-4"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "payments": {
                "charge": true,
                "refund": true,
                "void_charge": true,
                "void_refund": true,
                "update_payment_totals": true,
                "update_refund_totals": true
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "unique": true,
                "auto": true,
                "immutable": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Payment Number"
            },
            "ref": {
                "type": "string",
                "unique": true,
                "label": "Reference Number",
                "description": "External reference number"
            },
            "method": {
                "type": "string",
                "required": true,
                "immutable": true
            },
            "gateway": {
                "type": "string",
                "immutable": true
            },
            "amount": {
                "type": "currency",
                "required": true,
                "immutable": true,
                "min": 0.01
            },
            "amount_refunded": {
                "type": "currency",
                "readonly": true
            },
            "amount_refundable": {
                "type": "currency",
                "formula": "if(and(success, not(void)), amount - amount_refunded, 0)",
                "readonly": true
            },
            "success": {
                "type": "bool",
                "immutable": true,
                "description": "Indicates the payment transaction was successful"
            },
            "captured": {
                "type": "bool",
                "description": "Indicates the payment has been fully captured if applicable"
            },
            "void": {
                "type": "bool",
                "immutable": true,
                "rules": [{
                    "expression": "and(void, amount_refunded \u003E 0)",
                    "error": "Cannot void after refund applied"
                }]
            },
            "error": {
                "type": "object",
                "description": "Error message returned by a gateway if applicable",
                "fields": {
                    "code": {
                        "type": "string"
                    },
                    "message": {
                        "type": "string"
                    }
                }
            },
            "status": {
                "type": "string",
                "default": "pending",
                "auto": true,
                "readonly": true,
                "enum": [{
                    "value": "pending",
                    "label": "Pending"
                }, {
                    "value": "void",
                    "label": "Void",
                    "conditions": {
                        "void": true
                    }
                }, {
                    "value": "error",
                    "label": "Error",
                    "conditions": {
                        "success": false
                    }
                }, {
                    "value": "success",
                    "label": "Success",
                    "conditions": {
                        "success": true
                    }
                }]
            },
            "transaction_id": {
                "type": "string",
                "label": "Transaction ID",
                "description": "Charge transaction ID returned by a payment gateway if applicable"
            },
            "card": {
                "type": "object",
                "label": "Payment Card",
                "description": "Payment card details if applicable",
                "fields": {
                    "token": {
                        "type": "string",
                        "required": true
                    },
                    "exp_month": {
                        "type": "int"
                    },
                    "exp_year": {
                        "type": "int"
                    },
                    "brand": {
                        "type": "string"
                    },
                    "last4": {
                        "type": "string"
                    },
                    "test": {
                        "type": "bool"
                    },
                    "address_check": {
                        "type": "string"
                    },
                    "zip_check": {
                        "type": "string"
                    },
                    "cvc_check": {
                        "type": "string"
                    }
                }
            },
            "account_card_id": {
                "type": "objectid"
            },
            "account_card": {
                "type": "link",
                "model": "accounts:cards",
                "key": "account_card_id"
            },
            "order_id": {
                "type": "objectid",
                "immutable": true,
                "default": {
                    "__D__formula": "invoice.order_id"
                }
            },
            "order": {
                "type": "link",
                "model": "orders",
                "key": "order_id"
            },
            "subscription_id": {
                "type": "objectid",
                "immutable": true,
                "default": {
                    "__D__formula": "invoice.subscription_id"
                }
            },
            "subscription": {
                "type": "link",
                "model": "subscriptions",
                "key": "subscription_id"
            },
            "account_id": {
                "type": "objectid",
                "required": true,
                "immutable": true,
                "default": {
                    "__D__formula": "invoice.account_id"
                }
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            },
            "invoice_id": {
                "type": "objectid",
                "immutable": true
            },
            "invoice": {
                "type": "link",
                "model": "invoices",
                "key": "invoice_id"
            },
            "refunds": {
                "id": "com.payments:refunds",
                "name": "payments:refunds",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "payments",
                        "key": "parent_id",
                        "label": " Payment"
                    },
                    "number": {
                        "type": "string",
                        "unique": true,
                        "auto": true,
                        "immutable": true,
                        "increment": {
                            "pattern": "{100000}"
                        },
                        "label": "Refund Number"
                    },
                    "ref": {
                        "type": "string",
                        "unique": true,
                        "label": "Reference Code",
                        "description": "External system identifier"
                    },
                    "method": {
                        "type": "string",
                        "required": true
                    },
                    "amount": {
                        "type": "currency",
                        "required": true,
                        "immutable": true,
                        "min": 0.01
                    },
                    "success": {
                        "type": "bool",
                        "immutable": true,
                        "description": "Indicates whether the refund was successfully processed"
                    },
                    "void": {
                        "type": "bool",
                        "immutable": true
                    },
                    "error": {
                        "type": "object",
                        "description": "Error message returned by a gateway where applicable",
                        "fields": {
                            "code": {
                                "type": "string"
                            },
                            "message": {
                                "type": "string"
                            }
                        }
                    },
                    "transaction_id": {
                        "type": "string",
                        "label": "Transaction ID",
                        "description": "Refund transaction ID returned by a payment gateway if applicable"
                    },
                    "status": {
                        "type": "string",
                        "default": "pending",
                        "auto": true,
                        "readonly": true,
                        "enum": [{
                            "value": "pending",
                            "label": "Pending"
                        }, {
                            "value": "void",
                            "label": "Void",
                            "conditions": {
                                "void": true
                            }
                        }, {
                            "value": "error",
                            "label": "Error",
                            "conditions": {
                                "success": false
                            }
                        }, {
                            "value": "success",
                            "label": "Success",
                            "conditions": {
                                "success": true
                            }
                        }]
                    },
                    "credit_id": {
                        "type": "objectid"
                    },
                    "credit": {
                        "type": "link",
                        "model": "credits",
                        "key": "credit_id"
                    },
                    "currency": {
                        "type": "string",
                        "length": 3
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "id",
                "parent": "payments",
                "type": "collection",
                "extends": "base",
                "label": "Payment Refund",
                "plural": "Payment Refunds"
            },
            "currency": {
                "type": "string",
                "length": 3
            }
        },
        "id": "com.payments",
        "label": "Payment",
        "name": "payments",
        "name_field": "number",
        "plural": "Payments",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "secondary_field": "number",
        "triggers": [],
        "version": "1.0.2-7"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "products": {
                "apply_pricing": true,
                "apply_type": true
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "name": {
                "type": "string",
                "required": true,
                "label": "Product Name"
            },
            "slug": {
                "type": "string",
                "unique": true,
                "default": {
                    "__D__formula": "slug(name)"
                }
            },
            "type": {
                "type": "string",
                "label": "Product Type"
            },
            "sku": {
                "type": "string",
                "unique": true,
                "label": "SKU"
            },
            "code": {
                "type": "string",
                "label": "Barcode",
                "description": "Product barcode, UPC, EAN, or ISBN"
            },
            "active": {
                "type": "bool",
                "default": false
            },
            "cost": {
                "type": "currency"
            },
            "price": {
                "type": "currency",
                "label": "List Price"
            },
            "sale_price": {
                "type": "currency"
            },
            "prices": {
                "type": "array",
                "value_type": "object",
                "label": "Price Rules",
                "fields": {
                    "price": {
                        "type": "currency",
                        "required": true,
                        "description": "Price applied when conditions are met"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "description": "Product variant for which this rule applies"
                    },
                    "quantity_min": {
                        "type": "int",
                        "label": "Min Quantity",
                        "description": "Minimum quantity to apply price"
                    },
                    "quantity_max": {
                        "type": "int",
                        "label": "Max Quantity",
                        "description": "Maximum quantity to apply price"
                    },
                    "account_group": {
                        "type": "string",
                        "description": "Account group for which the rule is applied"
                    }
                }
            },
            "tax_class": {
                "type": "string"
            },
            "summary": {
                "type": "string",
                "multiline": true
            },
            "description": {
                "type": "string",
                "multiline": true
            },
            "meta_title": {
                "type": "string"
            },
            "meta_keywords": {
                "type": "string"
            },
            "meta_description": {
                "type": "string",
                "multiline": true
            },
            "virtual": {
                "type": "bool"
            },
            "delivery": {
                "type": "string",
                "enum": [{
                    "label": "None"
                }, {
                    "value": "shipment",
                    "label": "Shipment"
                }, {
                    "value": "subscription",
                    "label": "Subscription"
                }, {
                    "value": "download",
                    "label": "Download"
                }, {
                    "value": "booking",
                    "label": "Booking"
                }, {
                    "value": "giftcard",
                    "label": "Gift Card"
                }]
            },
            "shipment_location": {
                "type": "string"
            },
            "shipment_weight": {
                "type": "float",
                "scale": 1
            },
            "shipment_package_quantity": {
                "type": "float",
                "scale": 2,
                "label": "Max Package Quantity"
            },
            "shipment_prices": {
                "type": "array",
                "value_type": "object",
                "label": "Shipment Price Rules",
                "fields": {
                    "service": {
                        "type": "string",
                        "required": true
                    },
                    "price": {
                        "type": "currency"
                    },
                    "package_quantity": {
                        "type": "int",
                        "label": "Max Package Quantity"
                    }
                }
            },
            "subscription_interval": {
                "type": "string",
                "enum": [{
                    "value": "monthly",
                    "label": "Monthly"
                }, {
                    "value": "daily",
                    "label": "Daily"
                }, {
                    "value": "weekly",
                    "label": "Weekly"
                }, {
                    "value": "yearly",
                    "label": "Yearly"
                }]
            },
            "subscription_interval_count": {
                "type": "int"
            },
            "subscription_trial_days": {
                "type": "int"
            },
            "download_source": {
                "type": "string"
            },
            "download_limit": {
                "type": "int"
            },
            "variants": {
                "id": "com.products:variants",
                "name": "products:variants",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "products",
                        "key": "parent_id",
                        "label": " Product"
                    },
                    "name": {
                        "type": "string",
                        "required": true,
                        "label": "Variant Name"
                    },
                    "sku": {
                        "type": "string",
                        "label": "SKU"
                    },
                    "code": {
                        "type": "string",
                        "label": "Barcode",
                        "description": "Product barcode, UPC, EAN, or ISBN"
                    },
                    "active": {
                        "type": "bool",
                        "default": false
                    },
                    "price": {
                        "type": "currency",
                        "label": "List Price"
                    },
                    "image_id": {
                        "type": "objectid"
                    },
                    "options": {
                        "type": "array",
                        "value_type": "object",
                        "label": "Related Options",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "value": {
                                "type": "string"
                            }
                        }
                    },
                    "stock_level": {
                        "type": "int",
                        "readonly": true,
                        "level": "Current Stock Level"
                    },
                    "currency": {
                        "type": "string",
                        "length": 3
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "name",
                "parent": "products",
                "type": "collection",
                "label": "Product Variant",
                "plural": "Product Variants",
                "extends": "base",
                "description": "Variations represented as unique product options"
            },
            "attributes": {
                "type": "array",
                "value_type": "object",
                "label": "Product Attributes",
                "fields": {
                    "id": {
                        "type": "string",
                        "required": true
                    },
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "value": {
                        "type": "string"
                    }
                }
            },
            "options": {
                "type": "array",
                "value_type": "object",
                "label": "Product Options",
                "fields": {
                    "id": {
                        "type": "string",
                        "default": {
                            "__D__formula": "underscore(name)"
                        }
                    },
                    "name": {
                        "type": "string",
                        "required": true,
                        "label": "Option Name",
                        "description": "Name used to identify the option in user interfaces"
                    },
                    "price": {
                        "type": "currency",
                        "default": 0,
                        "description": "Price added to the order if the option is selected"
                    },
                    "variant": {
                        "type": "bool",
                        "label": "Variant Property",
                        "description": "Indicates the option is a property of a variant"
                    },
                    "control": {
                        "type": "string",
                        "enum": [{
                            "value": "text",
                            "label": "Text"
                        }, {
                            "value": "select",
                            "label": "Select"
                        }, {
                            "value": "radio",
                            "label": "Radio"
                        }, {
                            "value": "checkbox",
                            "label": "Checkbox"
                        }, {
                            "value": "checkbox_multi",
                            "label": "Checkbox (Multiple Choice)"
                        }],
                        "label": "Input Control",
                        "description": "User input control type used to enter the option value"
                    },
                    "values": {
                        "type": "array",
                        "label": "Option Values",
                        "description": "List of values used for select options"
                    },
                    "required": {
                        "type": "bool",
                        "description": "Indicates the option requires a value"
                    }
                }
            },
            "bundle": {
                "type": "bool"
            },
            "bundle_items": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "auto": true
                    },
                    "quantity": {
                        "type": "int",
                        "default": 1
                    },
                    "product_id": {
                        "type": "objectid",
                        "required": true,
                        "unique": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    }
                }
            },
            "images": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "auto": true
                    },
                    "caption": {
                        "type": "string"
                    },
                    "file": {
                        "type": "file",
                        "fields": {
                            "id": {
                                "type": "objectid",
                                "readonly": true
                            },
                            "date_uploaded": {
                                "type": "date",
                                "readonly": true
                            },
                            "length": {
                                "type": "int",
                                "readonly": true
                            },
                            "md5": {
                                "type": "string",
                                "readonly": true
                            },
                            "filename": {
                                "type": "string"
                            },
                            "content_type": {
                                "type": "string"
                            },
                            "metadata": {
                                "type": "object"
                            },
                            "data": {
                                "type": "filedata"
                            },
                            "url": {
                                "type": "string"
                            },
                            "width": {
                                "type": "int"
                            },
                            "height": {
                                "type": "int"
                            }
                        }
                    }
                }
            },
            "category_id": {
                "type": "objectid"
            },
            "category": {
                "type": "link",
                "model": "categories",
                "key": "category_id",
                "label": "Primary Category"
            },
            "categories": {
                "type": "link",
                "model": "categories:products",
                "params": {
                    "product_id": "id"
                }
            },
            "category_index": {
                "type": "object",
                "readonly": true,
                "fields": {
                    "id": {
                        "type": "array",
                        "value_type": "objectid"
                    },
                    "sort": {
                        "type": "object",
                        "fields": {
                            "*": {
                                "type": "int"
                            }
                        }
                    }
                }
            },
            "stock": {
                "id": "com.products:stock",
                "name": "products:stock",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "products",
                        "key": "parent_id",
                        "label": " Product"
                    },
                    "number": {
                        "type": "string",
                        "unique": true,
                        "auto": true,
                        "immutable": true,
                        "increment": {
                            "pattern": "{100000}"
                        },
                        "label": "Adjustment Number"
                    },
                    "quantity": {
                        "type": "int",
                        "immutable": true,
                        "required": true,
                        "label": "Adjustment Quantity"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "default": null,
                        "immutable": true
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id",
                        "label": "Product Variant",
                        "params": {
                            "parent_id": "parent_id"
                        }
                    },
                    "last": {
                        "type": "link",
                        "url": "\/products:stock\/:last",
                        "params": {
                            "parent_id": "parent_id",
                            "variant_id": "variant_id"
                        }
                    },
                    "prev_id": {
                        "type": "objectid",
                        "immutable": true,
                        "formula": "last.id"
                    },
                    "prev": {
                        "type": "link",
                        "model": "products:stock",
                        "key": "prev_id",
                        "label": "Previous Stock Adjustment"
                    },
                    "level": {
                        "type": "int",
                        "immutable": true,
                        "readonly": true,
                        "formula": "prev.level + quantity",
                        "label": "Stock Level"
                    },
                    "reason": {
                        "type": "string",
                        "required": true,
                        "label": "Reason",
                        "enum": [{
                            "value": "received",
                            "label": "Received"
                        }, {
                            "value": "returned",
                            "label": "Returned"
                        }, {
                            "value": "canceled",
                            "label": "Canceled"
                        }, {
                            "value": "sold",
                            "label": "Sold"
                        }, {
                            "value": "missing",
                            "label": "Missing"
                        }, {
                            "value": "promotion",
                            "label": "Promotion"
                        }, {
                            "value": "damaged",
                            "label": "Damaged"
                        }, {
                            "value": "other",
                            "label": "Other"
                        }]
                    },
                    "description": {
                        "type": "string",
                        "multiline": true
                    },
                    "order_id": {
                        "type": "objectid"
                    },
                    "order": {
                        "type": "link",
                        "model": "orders",
                        "key": "order_id",
                        "label": "Related Order"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "reason",
                "parent": "products",
                "type": "collection",
                "label": "Stock Adjustment",
                "plural": "Stock Adjustments",
                "description": "History of stock level adjustments for this product",
                "extends": "base",
                "name_pattern": "{reason} ({quantity})",
                "triggers": [{
                    "id": "update_product_stock_level",
                    "label": "Update Product Stock Level",
                    "events": ["post.result", "delete.result"],
                    "include": {
                        "stock_level": {
                            "url": "\/products:stock\/:group",
                            "params": {
                                "where": {
                                    "parent_id": "parent_id"
                                }
                            },
                            "data": {
                                "value": {
                                    "__D__sum": "quantity"
                                }
                            }
                        }
                    },
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "model": "products",
                        "key": "parent_id",
                        "params": {
                            "stock_level": "stock_level.value"
                        }
                    }]
                }, {
                    "id": "update_variant_stock_level",
                    "label": "Update Variant Stock Level",
                    "events": ["post.result", "delete.result"],
                    "conditions": {
                        "variant_id": {
                            "__D__ne": null
                        }
                    },
                    "include": {
                        "stock_level": {
                            "url": "\/products:stock\/:group",
                            "params": {
                                "where": {
                                    "variant_id": "variant_id"
                                }
                            },
                            "data": {
                                "value": {
                                    "__D__sum": "quantity"
                                }
                            }
                        }
                    },
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "model": "products:variants",
                        "key": "variant_id",
                        "params": {
                            "stock_level": "stock_level.value"
                        }
                    }]
                }]
            },
            "quantity_min": {
                "type": "int",
                "label": "Minimum Quantity",
                "description": "Minimum quantity of the product that can be ordered"
            },
            "quantity_inc": {
                "type": "int",
                "label": "Quantity Increment",
                "description": "Product must be ordered in multiples of this value"
            },
            "variable": {
                "type": "bool",
                "description": "Indicates the product has variants enabled"
            },
            "stock_tracking": {
                "type": "bool",
                "description": "Indicates the product has stock tracking enabled"
            },
            "stock_level": {
                "type": "int",
                "readonly": true,
                "level": "Current Stock Level",
                "description": "Current stock level after all adjustments have been combined"
            },
            "stock_status": {
                "type": "string",
                "label": "Stock Status",
                "description": "Status of product stock for the purpose of ordering",
                "enum": [{
                    "value": "available",
                    "label": "Available"
                }, {
                    "value": "pre_order",
                    "label": "Pre-Order"
                }, {
                    "value": "backorder",
                    "label": "Backorder"
                }, {
                    "value": "out_of_stock",
                    "label": "Out Of Stock"
                }, {
                    "value": "discontinued",
                    "label": "Discontinued"
                }]
            },
            "stock_status_message": {
                "type": "string",
                "label": "Custom Stock Status",
                "description": "Custom description of product stock status"
            },
            "date_stock_expected": {
                "type": "date",
                "label": "Date Stock Expected",
                "description": "Date stock is expected to become available"
            },
            "reviews": {
                "id": "com.products:reviews",
                "name": "products:reviews",
                "api": "com",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "label": "ID"
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "label": "Created"
                    },
                    "date_updated": {
                        "type": "date",
                        "auto": "update",
                        "label": "Updated"
                    },
                    "parent_id": {
                        "type": "objectid",
                        "immutable": true,
                        "required": true
                    },
                    "parent": {
                        "type": "link",
                        "model": "products",
                        "key": "parent_id",
                        "label": " Product"
                    },
                    "rating": {
                        "type": "int",
                        "default": 1,
                        "max": 5
                    },
                    "comments": {
                        "type": "string"
                    },
                    "account_id": {
                        "type": "objectid"
                    },
                    "variant_id": {
                        "type": "objectid"
                    },
                    "account": {
                        "type": "link",
                        "model": "accounts",
                        "key": "account_id"
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    }
                },
                "primary_field": "id",
                "query": {
                    "page": 1,
                    "limit": 15,
                    "window": 5,
                    "sort": "id desc"
                },
                "name_field": "id",
                "parent": "products",
                "type": "collection",
                "label": "Product Review",
                "plural": "Product Reviews",
                "extends": "base",
                "triggers": [{
                    "id": "update_product_rating_avg",
                    "name": "Update Product Rating Average",
                    "events": ["put.result", "post.result"],
                    "include": {
                        "rating_avg": {
                            "url": "\/products:reviews\/:group",
                            "params": {
                                "where": {
                                    "product_id": "parent_id"
                                }
                            },
                            "data": {
                                "value": {
                                    "__D__avg": "rating"
                                }
                            }
                        }
                    },
                    "actions": [{
                        "type": "request",
                        "method": "put",
                        "model": "products",
                        "key": "parent_id",
                        "params": {
                            "rating_avg": "rating_avg.value"
                        }
                    }]
                }]
            },
            "rating_avg": {
                "type": "float",
                "scale": 1,
                "label": "Average Rating",
                "description": "Average rating value of all product reviews"
            },
            "currency": {
                "type": "string",
                "length": 3
            }
        },
        "id": "com.products",
        "indexes": [{
            "fields": ["category_index"]
        }],
        "label": "Product",
        "name": "products",
        "name_field": "name",
        "plural": "Products",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "searches": [{
            "id": "default",
            "fields": ["name", "slug", "sku", "code", "description", "meta_keywords"]
        }],
        "secondary_field": "slug",
        "version": "1.0.2-8"
    }, {
        "api": "com",
        "development": true,
        "extends": "base",
        "features": {
            "return": {
                "methods": {
                    "restock": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "unique": true,
                "auto": true,
                "immutable": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Return Number"
            },
            "order_id": {
                "type": "objectid",
                "required": true,
                "immutable": true
            },
            "order": {
                "type": "link",
                "model": "orders",
                "key": "order_id"
            },
            "canceled": {
                "type": "bool"
            },
            "items": []
        },
        "id": "com.returns",
        "label": "RMA",
        "name": "returns",
        "name_field": "id",
        "plural": "Returns",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "version": "1.0.2-3"
    }, {
        "api": "com",
        "fields": {
            "id": {
                "type": "string",
                "label": "ID",
                "required": true,
                "unique": true
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            }
        },
        "id": "com.settings",
        "label": "Setting",
        "name": "settings",
        "plural": "Settings",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 10,
            "sort": "id desc"
        },
        "version": "1.0.2-3"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "shipments": {
                "methods": {
                    "label_purchase": true,
                    "update_order_delivered": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "number": {
                "type": "string",
                "unique": true,
                "auto": true,
                "immutable": true,
                "increment": {
                    "pattern": "{100000}"
                },
                "label": "Shipment Number"
            },
            "order_id": {
                "type": "objectid",
                "required": true,
                "immutable": true
            },
            "order": {
                "type": "link",
                "model": "orders",
                "key": "order_id"
            },
            "canceled": {
                "type": "bool"
            },
            "items": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "auto": true
                    },
                    "order_item_id": {
                        "type": "objectid"
                    },
                    "bundle_item_id": {
                        "type": "objectid"
                    },
                    "quantity": {
                        "type": "int"
                    },
                    "options": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "value": {
                                "type": "string"
                            }
                        }
                    },
                    "product_id": {
                        "type": "objectid",
                        "required": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant_id": {
                        "type": "objectid"
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    }
                },
                "required": true
            },
            "origin": {
                "type": "object",
                "fields": {
                    "location": {
                        "type": "string",
                        "default": "default"
                    }
                }
            },
            "destination": {
                "type": "object",
                "default": {
                    "__D__formula": "order.shipping"
                },
                "fields": {
                    "name": {
                        "type": "string",
                        "required": true
                    },
                    "address1": {
                        "type": "string",
                        "required": true
                    },
                    "address2": {
                        "type": "string"
                    },
                    "city": {
                        "type": "string"
                    },
                    "state": {
                        "type": "string"
                    },
                    "zip": {
                        "type": "string"
                    },
                    "country": {
                        "type": "string",
                        "required": true,
                        "length": 2
                    },
                    "phone": {
                        "type": "string"
                    }
                }
            },
            "packages": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "type": {
                        "type": "string"
                    },
                    "weight": {
                        "type": "float",
                        "scale": 1
                    },
                    "length": {
                        "type": "float",
                        "scale": 1
                    },
                    "width": {
                        "type": "float",
                        "scale": 1
                    },
                    "height": {
                        "type": "float",
                        "scale": 1
                    }
                }
            },
            "label": {
                "type": "object",
                "fields": {
                    "date_created": {
                        "type": "date",
                        "auto": true
                    },
                    "purhcase": {
                        "type": "bool",
                        "immutable": true
                    },
                    "date_purchased": {
                        "type": "date",
                        "immutable": true
                    },
                    "image": {
                        "type": "file",
                        "fields": {
                            "id": {
                                "type": "objectid",
                                "readonly": true
                            },
                            "date_uploaded": {
                                "type": "date",
                                "readonly": true
                            },
                            "length": {
                                "type": "int",
                                "readonly": true
                            },
                            "md5": {
                                "type": "string",
                                "readonly": true
                            },
                            "filename": {
                                "type": "string"
                            },
                            "content_type": {
                                "type": "string"
                            },
                            "metadata": {
                                "type": "object"
                            },
                            "data": {
                                "type": "filedata"
                            },
                            "url": {
                                "type": "string"
                            },
                            "width": {
                                "type": "int"
                            },
                            "height": {
                                "type": "int"
                            }
                        }
                    }
                }
            },
            "service": {
                "type": "string"
            },
            "service_name": {
                "type": "string"
            },
            "tracking_code": {
                "type": "string"
            },
            "notifications": {
                "type": "link",
                "model": "notifications",
                "params": {
                    "record_id": "id"
                }
            }
        },
        "id": "com.shipments",
        "label": "Shipment",
        "name": "shipments",
        "name_field": "id",
        "plural": "Shipments",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "searches": [{
            "id": "default",
            "fields": ["id", "order_id", "packages.tracking_code", "destination.name", "destination.address1"]
        }],
        "version": "1.0.2-9"
    }, {
        "api": "com",
        "extends": "base",
        "features": {
            "subscriptions": {
                "methods": {
                    "default_product": true,
                    "apply_coupon": true,
                    "apply_taxes": true,
                    "invoice_payment": true,
                    "activate_cycle": true
                },
                "tasks": {
                    "invoice_payment_cycle": true,
                    "invoice_payment_retry": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "currency": {
                "immutable": true,
                "type": "string",
                "length": 3
            },
            "account_id": {
                "type": "objectid",
                "required": true,
                "immutable": true
            },
            "account": {
                "type": "link",
                "model": "accounts",
                "key": "account_id"
            },
            "product_id": {
                "type": "objectid",
                "required": true,
                "rules": [{
                    "expression": "if(product, product.delivery != 'subscription')",
                    "error": "Product delivery must be 'Subscription'"
                }],
                "unique": ["account_id", "product_id", {
                    "active": true
                }]
            },
            "product": {
                "type": "link",
                "model": "products",
                "key": "product_id"
            },
            "variant_id": {
                "type": "objectid"
            },
            "variant": {
                "type": "link",
                "model": "products:variants",
                "key": "variant_id",
                "params": {
                    "parent_id": "product_id"
                }
            },
            "price": {
                "type": "currency",
                "default": {
                    "__D__formula": "product.price"
                }
            },
            "quantity": {
                "type": "int",
                "default": 1,
                "min": 0
            },
            "price_total": {
                "type": "currency",
                "formula": "price * quantity"
            },
            "interval": {
                "type": "string",
                "enum": [{
                    "value": "monthly",
                    "label": "Monthly"
                }, {
                    "value": "daily",
                    "label": "Daily"
                }, {
                    "value": "weekly",
                    "label": "Weekly"
                }, {
                    "value": "yearly",
                    "label": "Yearly"
                }]
            },
            "interval_count": {
                "type": "int"
            },
            "items": {
                "type": "array",
                "value_type": "object",
                "label": "Line Items",
                "fields": {
                    "id": {
                        "type": "objectid",
                        "auto": true,
                        "immutable": true
                    },
                    "date_created": {
                        "type": "date",
                        "auto": true,
                        "immutable": true
                    },
                    "quantity": {
                        "type": "int",
                        "default": 1,
                        "min": 1
                    },
                    "price": {
                        "type": "currency"
                    },
                    "price_total": {
                        "type": "currency",
                        "formula": "price * quantity"
                    },
                    "proration": {
                        "type": "bool"
                    },
                    "discounts": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "amount": {
                                "type": "currency"
                            }
                        }
                    },
                    "discount_total": {
                        "type": "currency",
                        "formula": "sum(discounts.amount)"
                    },
                    "discount_each": {
                        "type": "currency",
                        "formula": "discount_total \/ quantity",
                        "label": "Discount Amount"
                    },
                    "taxes": {
                        "type": "array",
                        "value_type": "object",
                        "fields": {
                            "id": {
                                "type": "string"
                            },
                            "amount": {
                                "type": "currency"
                            }
                        }
                    },
                    "tax_total": {
                        "type": "currency",
                        "formula": "sum(taxes.amount)"
                    },
                    "tax_each": {
                        "type": "currency",
                        "formula": "tax_total \/ quantity",
                        "label": "Tax Amount"
                    },
                    "product_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "product": {
                        "type": "link",
                        "model": "products",
                        "key": "product_id"
                    },
                    "variant_id": {
                        "type": "objectid",
                        "immutable": true
                    },
                    "variant": {
                        "type": "link",
                        "model": "products:variants",
                        "key": "variant_id"
                    },
                    "description": {
                        "type": "string"
                    }
                }
            },
            "active": {
                "type": "bool",
                "default": false,
                "readonly": true
            },
            "trial": {
                "type": "bool",
                "formula": "date_trial_end \u003E now()",
                "readonly": true
            },
            "paid": {
                "type": "bool",
                "default": false,
                "readonly": true,
                "formula": "if(payment_balance \u003E= 0, true, false)"
            },
            "unpaid": {
                "type": "bool",
                "default": false,
                "formula": "if(not(paid), unpaid, false)"
            },
            "prorated": {
                "type": "bool"
            },
            "date_prorated": {
                "type": "date"
            },
            "canceled": {
                "type": "bool",
                "immutable": true
            },
            "date_canceled": {
                "type": "date",
                "readonly": true
            },
            "status": {
                "type": "string",
                "readonly": true,
                "auto": true,
                "enum": [{
                    "value": "pending",
                    "label": "Pending"
                }, {
                    "value": "active",
                    "label": "Active",
                    "conditions": {
                        "active": true,
                        "trial": false,
                        "paid": true,
                        "unpaid": false
                    }
                }, {
                    "value": "trial",
                    "label": "Trial",
                    "conditions": {
                        "active": true,
                        "trial": true
                    }
                }, {
                    "value": "pastdue",
                    "label": "Past Due",
                    "conditions": {
                        "active": true,
                        "paid": false,
                        "unpaid": false
                    }
                }, {
                    "value": "unpaid",
                    "label": "Unpaid",
                    "conditions": {
                        "active": true,
                        "unpaid": true
                    }
                }, {
                    "value": "canceled",
                    "label": "Canceled",
                    "conditions": {
                        "canceled": true
                    }
                }, {
                    "value": "unpaid",
                    "label": "Unpaid",
                    "conditions": {
                        "active": true,
                        "paid": false
                    }
                }]
            },
            "discounts": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "string"
                    },
                    "type": {
                        "type": "string",
                        "enum": ["sale", "coupon"]
                    },
                    "rule": {
                        "type": "object"
                    },
                    "amount": {
                        "type": "currency"
                    }
                }
            },
            "taxes": {
                "type": "array",
                "value_type": "object",
                "fields": {
                    "id": {
                        "type": "string"
                    },
                    "name": {
                        "type": "string"
                    },
                    "priority": {
                        "type": "int"
                    },
                    "rate": {
                        "type": "float",
                        "scale": 3
                    },
                    "amount": {
                        "type": "currency"
                    }
                }
            },
            "trial_days": {
                "type": "int",
                "immutable": true
            },
            "date_trial_start": {
                "type": "date",
                "readonly": true,
                "label": "Trial Start"
            },
            "date_trial_end": {
                "type": "date",
                "label": "Trial End"
            },
            "date_period_start": {
                "type": "date",
                "readonly": true,
                "label": "Period Start"
            },
            "date_period_end": {
                "type": "date",
                "formula": "if(trial, date_trial_end, date_next_interval(interval, date_period_start, interval_count, or(date_trial_end, date_prorated, date_created)))",
                "readonly": true,
                "label": "Period End"
            },
            "cancel_at_end": {
                "type": "bool",
                "label": "Cancel at Period End"
            },
            "coupon_code": {
                "type": "string"
            },
            "coupon_id": {
                "type": "objectid"
            },
            "coupon": {
                "type": "link",
                "model": "coupons",
                "key": "coupon_id"
            },
            "item_total": {
                "type": "currency",
                "formula": "sum(items.price_total)"
            },
            "sub_total": {
                "type": "currency",
                "formula": "price_total + item_total",
                "label": "Subtotal"
            },
            "item_discount": {
                "type": "currency",
                "formula": "sum(items.discount_total)"
            },
            "item_tax": {
                "type": "currency",
                "formula": "sum(items.tax_total)"
            },
            "discount_total": {
                "type": "currency",
                "formula": "sum(discounts.amount)"
            },
            "tax_total": {
                "type": "currency",
                "formula": "sum(taxes.amount)"
            },
            "tax_included": {
                "type": "bool"
            },
            "tax_included_total": {
                "type": "currency",
                "formula": "if(tax_included, 0, tax_total)"
            },
            "grand_total": {
                "type": "currency",
                "formula": "sub_total + tax_included_total - (discount_total)",
                "rounded": true
            },
            "recurring_discount_total": {
                "type": "currency",
                "formula": "discount_total - item_discount"
            },
            "recurring_tax_total": {
                "type": "currency",
                "formula": "tax_total - item_tax"
            },
            "recurring_tax_included_total": {
                "type": "currency",
                "formula": "if(tax_included, 0, recurring_tax_total)"
            },
            "recurring_total": {
                "type": "currency",
                "formula": "price_total + recurring_tax_included_total - recurring_discount_total"
            },
            "recycle": {
                "type": "bool"
            },
            "credit_total": {
                "type": "currency",
                "readonly": true
            },
            "payment_total": {
                "type": "currency",
                "readonly": true
            },
            "refund_total": {
                "type": "currency",
                "readonly": true
            },
            "payment_balance": {
                "type": "currency",
                "formula": "payment_total - refund_total - grand_total + (credit_total) + (item_total)"
            },
            "date_payment_retry": {
                "type": "date"
            },
            "invoices": {
                "type": "link",
                "model": "invoices",
                "params": {
                    "subscription_id": "id"
                }
            }
        },
        "id": "com.subscriptions",
        "label": "Subscription",
        "name": "subscriptions",
        "name_field": "product.name",
        "name_pattern": "{account.name} \/ {product.name}",
        "plural": "Subscriptions",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 5,
            "sort": "id desc"
        },
        "triggers": [],
        "version": "1.0.2-6"
    }, {
        "api": "com",
        "features": {
            "admin__S__webhooks": {
                "tasks": {
                    "send": true,
                    "retry": true
                }
            }
        },
        "fields": {
            "id": {
                "type": "objectid",
                "label": "ID"
            },
            "date_created": {
                "type": "date",
                "auto": true,
                "label": "Created"
            },
            "date_updated": {
                "type": "date",
                "auto": "update",
                "label": "Updated"
            },
            "webhook": {
                "type": "string",
                "required": true,
                "description": "Webhook name"
            },
            "record_id": {
                "type": "objectid",
                "required": true,
                "description": "Record ID of the collection for which the webhook is defined"
            },
            "record": {
                "type": "link",
                "url": "\/{config.model}\/{record_id}"
            },
            "url": {
                "type": "string",
                "description": "Notification contact address if applicable"
            },
            "error": {
                "type": "string",
                "description": "Error message returned by sending process if applicable"
            },
            "retry_count": {
                "type": "int"
            },
            "date_retry": {
                "type": "date"
            },
            "config": {
                "type": "link",
                "model": ":webhooks",
                "key": "webhook"
            }
        },
        "id": "com.webhooks",
        "label": "Webhook",
        "name": "webhooks",
        "plural": "Webhooks",
        "primary_field": "id",
        "query": {
            "page": 1,
            "limit": 15,
            "window": 10,
            "sort": "id desc"
        },
        "version": "1.0.2-2"
    }],
    "pages": null,
    "page": 1
};
var d = new Schema.Designer();