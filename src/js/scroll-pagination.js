import getRefs from './get-refs';
const refs = getRefs();

export default class ScrollPaginationExportData {
  constructor() {
    this.formData = {};
    this.STORAGE_KEY = 'scrollPagination-data';
  }

  populateData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.formData = JSON.parse(savedData);
      // Задать новое действие
      // document.body.dataset.switch = this.formData.status;

      // console.log(this.formData);
      // console.log(refs.scrollPagination);

      if (this.formData.tabs === 'radio-1') {
        refs.scrollPagination[0].checked = 'checked';
      } else refs.scrollPagination[1].checked = 'checked';
    }
  }

  onBgColorBtnClick(onClickData) {
    // document.body.dataset.switch = onClickData.value;
    this.formData[onClickData.name] = onClickData.id;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.formData));
  }
}
