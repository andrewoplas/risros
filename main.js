function initGauge(gaugeId) {
  if ($('#' + gaugeId).length) {
    new JustGage({
      id: gaugeId,
      value: 55,
      min: -100,
      max: 100,
      noGradient: true,
      shadowOpacity: 0,
      valueFontColor: '#35373B',
      labelFontColor: '#757E83',
      gaugeColor: '#F7F7FC',
      levelColors: ['#07E496'],
      relativeGaugeSize: true,
      labelMinFontSize: '7px',
      minLabelMinFontSize: '7px',
      maxLabelMinFontSize: '7px',
    });
  }
}

function initChart() {
  if ($('#weekly-score-chart').length) {
    const weeklyScoreData = {
      labels: [
        '2000',
        '2001',
        '2002',
        '2003',
        '2004',
        '2005',
        '2006',
        '2007',
        '2007',
        '2008',
        '2009',
        '2010',
        '2011',
        '2012',
        '2013',
        '2014',
        '2015',
        '2016',
        '2017',
        '2018',
      ],
      datasets: [
        {
          label: '# of Votes',
          data: [60, 50, 55, 45, 58, 80, 60, 59, 70, 65, 24, 5, 15, 10, 30, 25, 35, 50, 40, 45],
          backgroundColor: ['rgba(2, 171, 254, 0.2)'],
          pointBackgroundColor: 'rgba(255, 255, 255,1)',
          pointBorderColor: 'rgba(255, 255, 255,1)',
          borderColor: ['rgba(2, 171, 254,1)'],
          borderWidth: 1,
          fill: true,
        },
      ],
    };

    const weeklyScoreChartOptions = {
      layout: {
        padding: {
          top: 4,
        },
      },
      scales: {
        yAxes: [
          {
            display: false,
            gridLines: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              beginAtZero: false,
            },
          },
        ],
        xAxes: [
          {
            display: false,
          },
        ],
      },
      legend: {
        display: false,
      },
      plugins: {
        filler: {
          propagate: true,
        },
      },
      elements: {
        line: {
          tension: 0,
        },
        tooltips: {
          backgroundColor: 'rgba(31, 59, 179, 1)',
        },
      },
    };

    const weeklyScoreCanvas = $('#weekly-score-chart').get(0).getContext('2d');
    new Chart(weeklyScoreCanvas, {
      type: 'line',
      data: weeklyScoreData,
      options: weeklyScoreChartOptions,
    });
  }
}

function initDropdown() {
  $('.weekly-score-dropdown a').on('click', function () {
    $('.weekly-dropdown .selected-item').text($(this).text());
  });
}

function initDateRangePicker() {
  const start = moment().subtract(29, 'days');
  const end = moment();

  function cb(start, end) {
    $('#date-range-picker .date-range').html(start.format('MMM DD') + ' - ' + end.format('MMM DD'));
  }

  $('#date-range-picker').daterangepicker(
    {
      opens: 'left',
      startDate: start,
      endDate: end,
      ranges: {
        Today: [moment(), moment()],
        Yesterday: [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days': [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month': [moment().startOf('month'), moment().endOf('month')],
        'Last Month': [
          moment().subtract(1, 'month').startOf('month'),
          moment().subtract(1, 'month').endOf('month'),
        ],
      },
    },
    cb,
  );

  cb(start, end);
}

function initSidebar() {
  const submenu_animation_speed = 200,
    submenu_opacity_animation = true;

  const simulateClick = function (elem) {
    // Create our event (with options)
    var evt = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    });
    // If cancelled, don't dispatch our event
    var canceled = !elem.dispatchEvent(evt);
  };

  $(window).click(function () {
    if ($('body').hasClass('sidebar-show')) {
      var navToggle = document.querySelector('.navigation-toggle a');
      simulateClick(navToggle);
    }
  });

  $('.lime-sidebar').click(function (event) {
    event.stopPropagation();
  });

  $('#toggle-sidebar').on('click', function () {
    $('body').toggleClass('sidebar-show');
    $('#toggle-sidebar').toggleClass('fa-bars', !$('body').hasClass('sidebar-show'));
    $('#toggle-sidebar').toggleClass('fa-arrow-left', $('body').hasClass('sidebar-show'));

    return false;
  });

  var select_sub_menus = $('.accordion-menu li:not(.open) .sub-menu'),
    active_page_sub_menu_link = $('.accordion-menu li.active-page > a');

  // Hide all sub-menus
  select_sub_menus.hide();

  if (submenu_opacity_animation == false) {
    $('.sub-menu li').each(function (i) {
      $(this).addClass('animation');
    });
  }

  // Accordion
  $('.accordion-menu li a').on('click', function () {
    var sub_menu = $(this).next('.sub-menu'),
      parent_list_el = $(this).parent('li'),
      active_list_element = $('.accordion-menu > li.open'),
      show_sub_menu = function () {
        sub_menu.slideDown(submenu_animation_speed);
        parent_list_el.addClass('open');
        if (submenu_opacity_animation === true) {
          $('.open .sub-menu li').each(function (i) {
            var t = $(this);
            setTimeout(function () {
              t.addClass('animation');
            }, (i + 1) * 25);
          });
        }
      },
      hide_sub_menu = function () {
        if (submenu_opacity_animation === true) {
          $('.open .sub-menu li').each(function (i) {
            var t = $(this);
            setTimeout(function () {
              t.removeClass('animation');
            }, (i + 1) * 15);
          });
        }
        sub_menu.slideUp(submenu_animation_speed);
        parent_list_el.removeClass('open');
      },
      hide_active_menu = function () {
        $('.accordion-menu > li.open > .sub-menu').slideUp(submenu_animation_speed);
        active_list_element.removeClass('open');
      };

    if (sub_menu.length) {
      if (!parent_list_el.hasClass('open')) {
        if (active_list_element.length) {
          hide_active_menu();
        }
        show_sub_menu();
      } else {
        hide_sub_menu();
      }

      return false;
    }
  });

  if ($('.active-page > .sub-menu').length) {
    active_page_sub_menu_link.click();
  }
}

function initSlimScroll() {
  $('.slimscroll').slimScroll({
    wheelStep: 5,
  });
}

function initialize() {
  // Gauge
  initGauge('gauge');

  // ChartJS
  initChart();

  // Dropdown
  initDropdown();

  // Daterangepicker
  initDateRangePicker();

  // Slimscroll
  initSlimScroll();
}

$(document).ready(function () {
  'use strict';

  // Sidebar
  initSidebar();
});
