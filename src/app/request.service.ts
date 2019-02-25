import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map} from 'rxjs/operators';

@Injectable()
export class HttpService {


  constructor (private http: HttpClient) { }

  searchCityName(cityName) {
    const url = 'https://weather-andreychenko.herokuapp.com/getcities?str=';
    if (cityName.length > 2) {
      return this.http.get(url + cityName);
    }
  }

  // http://api.openweathermap.org/data/2.5/weather?q=Lon&appid=53a2d481fe16e1130c7ff78d15f844d4
  search(cityName: string) {
    return this.http.get('https://api.openweathermap.org/data/2.5/forecast?q='
      + cityName + '&units=metric&appid=53a2d481fe16e1130c7ff78d15f844d4')
      .pipe(map( result2 => result2));
  }
}
