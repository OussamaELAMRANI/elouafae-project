$(document).ready(function() {

  $('.special.cards .image').dimmer({
    on: 'hover'
  });


});



function semanticUi() {

  var calenderUi =  ()=>  {
    $('.ui.calendar').calendar({
    type: 'date',
    text: {
      days: ['D', 'L', 'M', 'Mer', 'J', 'V', 'S'],
      months: ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'June', 'Juiller', 'Aôut', 'September', 'October', 'November', 'December'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Aujourd\'hui',
      now: 'Maintenant',
      am: 'AM',
      pm: 'PM'
    },
    popupOptions: {
      position: 'right center',
      lastResort: 'left center',
      prefer: 'opposite',
      hideOnScroll: false
    }
  });
}

  var accordionUi =  ()=> {
    $('.ui.accordion').accordion('refresh');
  }

  var multiSelect = () => {
    console.log('Salaaam DropDown +++++++++++ call Script.js file')
    $('.multi-select').dropdown();
    $('.ui.dropdown').dropdown({
      allowAdditions: true
    });
  }
  var checkboxUi = () => {
      $('.ui.radio.checkbox').checkbox();
  }


  return {
    accordionUi,
    calenderUi,
    multiSelect,
    checkboxUi
  }
}


