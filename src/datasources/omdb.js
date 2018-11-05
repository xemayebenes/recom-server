import { RESTDataSource } from 'apollo-datasource-rest';

const DATA_REQUEST_URL = 'http://www.omdbapi.com/';

export default class OmdbAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = DATA_REQUEST_URL;
  }

  willSendRequest(request) {
    request.params.set('apikey', 'a3d09618');
  }

  getMovie = async id => this.get('', { i: id });

  getSerie = async title => this.get('', { t: title });
}
