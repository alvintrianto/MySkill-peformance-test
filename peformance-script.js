import { check, group } from "k6";
import http from "k6/http"
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

export let options = {
    //Spike Test 
    stages: [
      {duration: "1s", target: 5},
      {duration: "5s", target: 5},
      {duration: "3s", target: 25},
      {duration: "5s", target: 5},
      {duration: "1s", target: 0},

    ],
  };

export default function(){
    group('K6 Get Test', ()=> {
        let response1 = http.get('https://test.k6.io');
        check( response1, {
            'is status 200': (r) => r.status == 200
        })
    
    })

}

export function handleSummary(data) {
    return {
      "script-result.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
    };
  }