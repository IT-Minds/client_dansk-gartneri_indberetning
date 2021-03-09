export interface Locale {
  locale: string; // !Must not be deleted. Used for providing the locale in the native language

  example: {
    title: string;
    byLine: string;
    dataLine: string;

    actions: {
      addNew: string;
    };
  };

  accounts: {
    id: string;
    name: string;
    email: string;
    tel: string;
    address1: string;
    address2: string;
    cvr: string;
  };
}
