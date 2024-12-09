import { DileAxios } from '../../../lib/DileAxios.js';
import { DileSelectAjax } from '@dile/ui/components/select';

export class DileAjaxSelectCrud extends DileAxios(DileSelectAjax) {

  static get properties() {
    return {
      maxResults: { type: Number },
      pageParamName: { type: String },
      getSelectResultList: { type: Object },
    };
  }

  constructor() {
    super();
  }

  searchValueInitial() {
    let request = this.axiosInstance.get(`${this.endpoint}/${this.value}`);
    request.then((response) => {
      if (response.status == 200) {
        let res = response.data;
        if (res.error) {
          this.registerError(res.data);
        } else {
          this.registerText(res.data);
        }
      } else {
        this.registerError('Bad response code');
      }
    })
      .catch(err => {
        this.registerError(err);
      });
  }

  loadData() {
    this.loading = true;
    let params = this.additionalQueryString || {};
    if (this.pageParamName && this.maxResults) {
      params[this.pageParamName] = this.maxResults;
    }
    params[this.queryStringVariable] = this.keyword;
    let request = this.axiosInstance.get(this.endpoint, { params });
    request.then((response) => {
      if (response.status == 200) {
        let res = response.data;
        if (res.error) {
          this.registerError(res.data);
        } else {
          this.registerData(res);
        }
      } else {
        this.registerError('Bad response code');
      }
    })
      .catch(err => {
        this.registerError(err);
      });
  }

  registerText(json) {
    this.selectedText = json[this.displayProperty];
    this.loading = false;
  }

  registerData(json) {
    if(this.getSelectResultList) {
      this.data = this.getSelectResultList(json);
    } else {
      this.data = this.getResultData(json);
    }
    this.updateComplete.then(() => this.loading = false)
  }
}
