import getRefs from './get-refs';
const refs = getRefs();

export default class BgColorExportData {
  constructor() {
    this.formData = {};
    this.STORAGE_KEY = 'bg-color-data';
  }

  populateData() {
    const savedData = localStorage.getItem(this.STORAGE_KEY);
    if (savedData) {
      this.formData = JSON.parse(savedData);
      document.body.dataset.switch = this.formData.status;

      if (this.formData.status === 'on') {
        refs.changeBgColorBtn[0].checked = 'checked';
      } else refs.changeBgColorBtn[1].checked = 'checked';
    }
  }

  onBgColorBtnClick(radio) {
    document.body.dataset.switch = radio.value;
    console.log('onBgColorBtnClick radio.value:', radio.value);

    this.formData[radio.name] = radio.value;
    console.log(this.formData);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.formData));
  }
}
