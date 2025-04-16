import dayjs from 'dayjs';
import _ from 'lodash';

export default {
  filesFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => item);
  },
  imageFormatter(arr) {
    if (!arr || !arr.length) return [];
    return arr.map((item) => ({
      publicUrl: item.publicUrl || '',
    }));
  },
  oneImageFormatter(arr) {
    if (!arr || !arr.length) return '';
    return arr[0].publicUrl || '';
  },
  dateFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
  },
  dateTimeFormatter(date) {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  },
  booleanFormatter(val) {
    return val ? 'Yes' : 'No';
  },
  dataGridEditFormatter(obj) {
    return _.transform(obj, (result, value, key) => {
      if (_.isArray(value)) {
        result[key] = _.map(value, 'id');
      } else if (_.isObject(value)) {
        result[key] = value.id;
      } else {
        result[key] = value;
      }
    });
  },

  drug_interactionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.drug_name);
  },
  drug_interactionsOneListFormatter(val) {
    if (!val) return '';
    return val.drug_name;
  },
  drug_interactionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.drug_name };
    });
  },
  drug_interactionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.drug_name, id: val.id };
  },

  medicine_vouchersManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.voucher_number);
  },
  medicine_vouchersOneListFormatter(val) {
    if (!val) return '';
    return val.voucher_number;
  },
  medicine_vouchersManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.voucher_number };
    });
  },
  medicine_vouchersOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.voucher_number, id: val.id };
  },

  patient_recordsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.patient_name);
  },
  patient_recordsOneListFormatter(val) {
    if (!val) return '';
    return val.patient_name;
  },
  patient_recordsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.patient_name };
    });
  },
  patient_recordsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.patient_name, id: val.id };
  },

  pharmacistsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  pharmacistsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  pharmacistsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  pharmacistsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  prescriptionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.prescription_code);
  },
  prescriptionsOneListFormatter(val) {
    if (!val) return '';
    return val.prescription_code;
  },
  prescriptionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.prescription_code };
    });
  },
  prescriptionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.prescription_code, id: val.id };
  },

  transactionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.transaction_id);
  },
  transactionsOneListFormatter(val) {
    if (!val) return '';
    return val.transaction_id;
  },
  transactionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.transaction_id };
    });
  },
  transactionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.transaction_id, id: val.id };
  },

  rolesManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  rolesOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  rolesManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  rolesOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  permissionsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  permissionsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  permissionsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  permissionsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },

  organizationsManyListFormatter(val) {
    if (!val || !val.length) return [];
    return val.map((item) => item.name);
  },
  organizationsOneListFormatter(val) {
    if (!val) return '';
    return val.name;
  },
  organizationsManyListFormatterEdit(val) {
    if (!val || !val.length) return [];
    return val.map((item) => {
      return { id: item.id, label: item.name };
    });
  },
  organizationsOneListFormatterEdit(val) {
    if (!val) return '';
    return { label: val.name, id: val.id };
  },
};
