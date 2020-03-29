async function fetchData() {
  const res = await axios.get(
    "https://api.covid19api.com/live/country/us/status/confirmed/date/2020-03-19T13:13:30Z"
  );

  // console.log(res.data);
  //console.log(res.data);
  const groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };

  // Group by color as key to the person array

  /*const newArr = res.data.map(n => {
    return {
      number: n.Cases,
      time: n.Date.slice(0, 10)
    };
  });*/

  // const date = groupBy(newArr, "time");
  var states = [
    "United States Virgin Islands",
    "South Dakota",
    "Mississippi",
    "Guam",
    "Alaska",
    "Maine",
    "Minnesota",
    "Rhode Island",
    "Oklahoma",
    "Grand Princess",
    "Iowa",
    "Diamond Princess",
    "Illinois",
    "New Jersey",
    "Oregon",
    "Nebraska",
    "New Mexico",
    "Vermont",
    "Puerto Rico",
    "Washington",
    "Colorado",
    "Massachusetts",
    "New Hampshire",
    "Utah",
    "North Dakota",
    "Alabama",
    "Connecticut",
    "District of Columbia",
    "Wyoming",
    "Arkansas",
    "Kentucky",
    "Nevada",
    "Florida",
    "Idaho",
    "Ohio",
    "Texas",
    "Montana",
    "Pennsylvania",
    "Georgia",
    "Hawaii",
    "Kansas",
    "Delaware",
    "Missouri",
    "West Virginia",
    "South Carolina",
    "Virginia",
    "Wisconsin",
    "Maryland",
    "Arizona",
    "California",
    "Indiana",
    "Tennessee",
    "Louisiana",
    "North Carolina",
    "New York",
    "Michigan",
    "American Samoa",
    "Virgin Islands"
  ];
  function province(state) {
    const date2 = groupBy(res.data, "Province");
    console.log(date2);

    const date3 = groupBy(res.data, "Date");

    const x = Object.keys(date3);
    const d = x.map(n => {
      return n.slice(0, 10);
    });

    const time = d.reduce((accum, current) => {
      if (accum[current]) {
        accum[current]++;
      } else {
        accum[current] = 1;
      }
      return accum;
    }, {});

    const timeArr = Object.keys(time);
    // console.log(timeArr);

    const il = date2[`${state}`];
    function calc(n) {
      const maxVal = [];
      const date = new Date().getDate();

      for (let i = 21; i <= date; i++) {
        const yes = n.filter(n => {
          if (!n.Date.includes(`2020-03-${i}`)) {
            return;
          } else {
            return n.Date.includes(`2020-03-${i}`);
          }
        });

        console.log(yes);
        const lat = yes
          .map(n => n.Cases)
          .reduce((accum, current) => {
            if (accum > current) {
              return accum;
            } else {
              return current;
            }
          });

        maxVal.push(lat);
      }
      return maxVal;
    }
    return {
      state: state,
      time: timeArr,
      data: calc(il)
    };
  }

  console.log(province("New York"));
  //   const objArray = [];
  //   for (let key in date2) {
  //     objArray.push({
  //       State: key,
  //       Array: date2[key]
  //     });
  //   }
  //   const ranArr = [];
  //   objArray.forEach(n => {
  //     const usArr = n.Array.map(n => {
  //       return {
  //         state: n.Province,
  //         number: n.Cases,
  //         time: n.Date.slice(0, 10)
  //       };
  //     });

  //     const eachState = groupBy(usArr, "time");
  //     for (let sub in eachState) {
  //       ranArr.push({
  //         time: sub,
  //         array: eachState[sub]
  //       });
  //     }
  //     console.log(ranArr);
  //   });

  //   const maxNumberArr = [];
  //   const timeArr = [];
  //   objArray.forEach(n => {
  //     const max = n.caseArray.reduce((accum, current) => {
  //       if (accum.number > current.number) {
  //         return accum.number;
  //       } else {
  //         return current.number;
  //       }
  //     }, 0);
  //     maxNumberArr.push(max);
  //     timeArr.push(n.time);
  //   });

  let ctx = document.getElementById("myChart2");
  Chart.defaults.global.defaultFontSize = 16;
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: province("New York").time.slice(1),
      datasets: [
        {
          label: province("New York").state,
          data: province("New York").data,
          backgroundColor: [" rgb(221, 174, 19)"],
          borderColor: [" rgb(221, 174, 19)"],
          borderWidth: 2,
          fill: false,
          pointHoverRadius: 6,
          fontSize: 50,
          fontFamily: "Helvetica"
        },
        {
          label: province("New Jersey").state,
          data: province("New Jersey").data,
          backgroundColor: ["rgb(22, 238, 227)"],
          borderColor: ["rgb(22, 238, 227)"],
          borderWidth: 2,
          fill: false
        },
        {
          label: province("California").state,
          data: province("California").data,
          backgroundColor: ["rgb(29, 238, 22)"],
          borderColor: ["rgb(29, 238, 22)"],
          borderWidth: 2,
          fill: false
        },
        {
          label: province("Illinois").state,
          data: province("Illinois").data,
          backgroundColor: ["rgb(25, 22, 238)"],
          borderColor: ["rgb(25, 22, 238)"],
          borderWidth: 2,
          fill: false
        },
        {
          label: province("Washington").state,
          data: province("Washington").data,
          backgroundColor: ["rgb(238, 22, 173)"],
          borderColor: ["rgb(238, 22, 173)"],
          borderWidth: 2,
          fill: false
        },
        {
          label: province("Florida").state,
          data: province("Florida").data,
          backgroundColor: ["rgb(177, 22, 238)"],
          borderColor: ["rgb(177, 22, 238)"],
          borderWidth: 2,
          fill: false
        }
      ]
    },
    options: {}
  });
}

fetchData();

async function allCountry() {
  const res = await axios.get(
    "https://api.covid19api.com/total/country/us/status/confirmed"
  );

  const cases = res.data.map(n => {
    return n.Cases;
  });

  const date = res.data.map(n => {
    return n.Date.slice(0, 10);
  });

  let ctx = document.getElementById("myChart");
  let myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: date,
      datasets: [
        {
          label: "USA",
          data: cases,
          backgroundColor: ["rgb(75, 60, 9)"],
          borderColor: ["rgb(75, 60, 9)"],
          borderWidth: 3,
          fill: false
        }
      ]
    },
    options: {}
  });
}

allCountry();
