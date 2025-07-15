import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      home: 'Home',
      workers: 'Workers',
      contact: 'Contact',
      admin: 'Admin',
      
      // Common
      search: 'Search',
      filter: 'Filter',
      loading: 'Loading...',
      error: 'Error',
      submit: 'Submit',
      cancel: 'Cancel',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      
      // Homepage
      welcome: 'Welcome to WorkersHub',
      subtitle: 'Find skilled domestic workers for your home',
      findWorkers: 'Find Workers',
      
      // Worker listing
      allWorkers: 'All Workers',
      nationality: 'Nationality',
      profession: 'Profession',
      age: 'Age',
      status: 'Status',
      available: 'Available',
      booked: 'Booked',
      onLeave: 'On Leave',
      yearsOld: 'years old',
      
      // Worker profile
      workerProfile: 'Worker Profile',
      personalInfo: 'Personal Information',
      professionalInfo: 'Professional Information',
      passportNumber: 'Passport Number',
      religion: 'Religion',
      maritalStatus: 'Marital Status',
      single: 'Single',
      married: 'Married',
      divorced: 'Divorced',
      widowed: 'Widowed',
      bookNow: 'Book Now',
      
      // Booking form
      bookingForm: 'Booking Form',
      fullName: 'Full Name',
      phoneNumber: 'Phone Number',
      notes: 'Notes',
      submitBooking: 'Submit Booking',
      bookingSuccess: 'Booking submitted successfully!',
      bookingError: 'Error submitting booking. Please try again.',
      
      // Filters
      filterByNationality: 'Filter by Nationality',
      filterByProfession: 'Filter by Profession',
      filterByStatus: 'Filter by Status',
      ageRange: 'Age Range',
      minAge: 'Min Age',
      maxAge: 'Max Age',
      clearFilters: 'Clear Filters',
      
      // Professions
      housemaid: 'Housemaid',
      cleaningStaff: 'Cleaning Staff',
      nanny: 'Nanny',
      cook: 'Cook',
      elderlyCare: 'Elderly Care',
      gardener: 'Gardener',
      driver: 'Driver',
      
      // Footer
      allRightsReserved: 'All rights reserved',
      
      // Contact
      contactUs: 'Contact Us',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
    },
  },
  ar: {
    translation: {
      // Navigation
      home: 'الرئيسية',
      workers: 'العمال',
      contact: 'اتصل بنا',
      admin: 'المشرف',
      
      // Common
      search: 'بحث',
      filter: 'تصفية',
      loading: 'جارٍ التحميل...',
      error: 'خطأ',
      submit: 'إرسال',
      cancel: 'إلغاء',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      
      // Homepage
      welcome: 'مرحباً بك في منصة العمال',
      subtitle: 'اعثر على عمال ماهرين لمنزلك',
      findWorkers: 'البحث عن العمال',
      
      // Worker listing
      allWorkers: 'جميع العمال',
      nationality: 'الجنسية',
      profession: 'المهنة',
      age: 'العمر',
      status: 'الحالة',
      available: 'متاح',
      booked: 'محجوز',
      onLeave: 'في إجازة',
      yearsOld: 'سنة',
      
      // Worker profile
      workerProfile: 'ملف العامل',
      personalInfo: 'المعلومات الشخصية',
      professionalInfo: 'المعلومات المهنية',
      passportNumber: 'رقم الجواز',
      religion: 'الديانة',
      maritalStatus: 'الحالة الاجتماعية',
      single: 'أعزب',
      married: 'متزوج',
      divorced: 'مطلق',
      widowed: 'أرمل',
      bookNow: 'احجز الآن',
      
      // Booking form
      bookingForm: 'نموذج الحجز',
      fullName: 'الاسم الكامل',
      phoneNumber: 'رقم الهاتف',
      notes: 'ملاحظات',
      submitBooking: 'إرسال الحجز',
      bookingSuccess: 'تم إرسال الحجز بنجاح!',
      bookingError: 'خطأ في إرسال الحجز. يرجى المحاولة مرة أخرى.',
      
      // Filters
      filterByNationality: 'تصفية حسب الجنسية',
      filterByProfession: 'تصفية حسب المهنة',
      filterByStatus: 'تصفية حسب الحالة',
      ageRange: 'نطاق العمر',
      minAge: 'العمر الأدنى',
      maxAge: 'العمر الأقصى',
      clearFilters: 'مسح التصفية',
      
      // Professions
      housemaid: 'خادمة منزلية',
      cleaningStaff: 'عامل تنظيف',
      nanny: 'مربية أطفال',
      cook: 'طباخ',
      elderlyCare: 'رعاية كبار السن',
      gardener: 'بستاني',
      driver: 'سائق',
      
      // Footer
      allRightsReserved: 'جميع الحقوق محفوظة',
      
      // Contact
      contactUs: 'اتصل بنا',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      address: 'العنوان',
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false,
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;