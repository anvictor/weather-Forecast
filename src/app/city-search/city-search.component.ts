import {Component} from '@angular/core';
import {HttpService} from '../request.service';
import {City} from '../city';

@Component ({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.css'],
  providers: [HttpService]
})
export class CitySearchComponent {
  cityName = '';
  cityes: City[] = [];
  found = false;
  answerTemp: number;
  answerCountry: string;
  answerPressure: number;
  answerPopulation: number;
  windDeg: number;
  windSpeed: number;
  answer: any;
  done = false;
  arrow: any;
  arrowShadow: any;
  public get filteredArray() {
    return this.answer.list.filter((value, index) => index % 4 === 0 );
  }

  public paint_day_night(time) {
    const timeShort = +time.replace(':00', '' ).replace('‎', '' );
    let dayColor = 'rgba(0, 56, 112, 0.8)';
    if (timeShort > 6 && timeShort <= 18) {
      dayColor = 'wheat';
    } else {
      dayColor = 'rgba(0, 56, 112, 0.8)';
    }
    return dayColor;
  }

  public paint_weekDay(wd) {
    let color = '#19a2df';
    if (wd === 6) {
      color = 'darkorange';
    } else if (wd === 0) {
      color = 'red';
    }
    return color;
  }


  constructor(private httpService: HttpService)  {}
  searchCity(cityName: string) {
    this.cityes = [];
    this.httpService.searchCityName(cityName).subscribe((data: any) => this.cityes = data);
  }

  setCity(city, country) {
    this.found = true;
    this.cityName = city + ',' + country;
  }

  submit(cityName: string) {
    this.done = false;
    this.httpService.search(cityName).subscribe((data: any) => {
      this.answer = data;
      if (data) {
        this.done = true;
      this.answerTemp = this.answer.list[10].main.temp;
      this.answerCountry = data.city.country;
      this.answerPressure = data.list[10].main.pressure;
      this.answerPopulation = data.city.population;
      this.windDeg = data.list[10].wind.deg;
      this.windSpeed = data.list[10].wind.speed;
      }
    });
  }
   direction() {
     console.clear();
     this.arrow = document.getElementById('arrow');
     this.arrowShadow = document.getElementById('arrowShadow');
     this.arrow.style.transition = '3s';
     this.arrowShadow.style.transition = '2s';
     this.arrow.style.transform = 'rotate(0deg)';
     this.arrowShadow.style.transform = 'rotate(0deg)';
     this.arrow.style.transform = 'rotate(' + (+this.windDeg - 90) + 'deg)';
     this.arrowShadow.style.transform = 'rotate(' + (+this.windDeg - 90) + 'deg)';
     console.clear();
   }

  dateTimeFormat(dt: string) {
    let dateA =  dt + '000';
    const dateD = new Date((2018 - 1948) , 0, 0, 0, 0, 0, +dateA);
    let dateArr: any;
    let dateArr00: string;
    let dateArrYear: string;
    let dateArrComaDot: string;
    let dateArrSpace: string;
    let options: any;
    options = {
      year: 'numeric', month: 'short', weekday: 'short', day: 'numeric',
      hour: 'numeric', minute: 'numeric', second: 'numeric',
      hour12: false,
      timeZone: 'Europe/Kiev'
    };
    // ‎Сб‎, ‎6‎ ‎окт‎ ‎2018‎ г.‎, ‎21‎:‎00‎:‎00  ‎
    dateA = Intl.DateTimeFormat('ua-UA', options).format(dateD);
    dateArr00 = dateA.replace(':00:00', ':00').replace('‎:‎00‎:‎00', ':00');
    dateArrYear = dateArr00.replace(' г.‎ ', ' ').replace(' г., ', ' ');
    dateArrComaDot = dateArrYear.replace(',', '').replace('.', '');
    dateArrSpace = dateArrComaDot.replace(/ /gi, ',');
    dateArr = dateArrSpace.split(',');
    if (dateArr.length === 6) {dateArr.splice(4, 1); }
    dateArr.push(dateD.getDay());
    return dateArr;
  }

  clear() {
    this.done = false;
  }

  translit(text) {

    const vocabular = {
      'а': 'a',
      'б': 'b',
      'в': 'v',
      'г': 'g',
      'д': 'd',
      'е': 'e',
      'ё': 'yo',
      'є': 'ye',
      'ж': 'zh',
      'з': 'zh',
      'и': 'y',
      'і': 'i',
      'ї': 'yi',
      'й': 'j',
      'к': 'k',
      'л': 'l',
      'м': 'm',
      'н': 'n',
      'о': 'o',
      'п': 'p',
      'р': 'r',
      'с': 's',
      'т': 't',
      'у': 'u',
      'ф': 'f',
      'х': 'kh',
      'ц': 'ts',
      'ч': 'ch',
      'ш': 'sh',
      'щ': 'shch',
      'ъ': '',
      'ы': 'y',
      'ь': '',
      'э': 'e',
      'ю': 'iu',
      'я': 'ia'
    };
  }

}

