/**
 * @license Highstock JS v2.1.9 (2015-10-07)
 * Plugin for displaying a message when there is no data visible in chart.
 *
 * (c) 2010-2014 Highsoft AS
 * Author: Oystein Moseng
 *
 * License: www.highcharts.com/license
 */

(function (H) {
  const seriesTypes = H.seriesTypes
  const chartPrototype = H.Chart.prototype
  const defaultOptions = H.getOptions()
  const extend = H.extend
  const each = H.each

  // Add language option
  extend(defaultOptions.lang, {
    noData: 'No data to display'
  })

  // Add default display options for message
  defaultOptions.noData = {
    position: {
      x: 0,
      y: 0,
      align: 'center',
      verticalAlign: 'middle'
    },
    attr: {
    },
    style: {
      fontWeight: 'bold',
      fontSize: '12px',
      color: '#60606a'
    }
    // useHTML: false // docs
  }

  /**
	 * Define hasData functions for series. These return true if there are data points on this series within the plot area
	 */
  function hasDataPie () {
    return !!this.points.length /* != 0 */
  }

  each(['pie', 'gauge', 'waterfall', 'bubble'], function (type) {
    if (seriesTypes[type]) {
      seriesTypes[type].prototype.hasData = hasDataPie
    }
  })

  H.Series.prototype.hasData = function () {
    return this.visible && this.dataMax !== undefined && this.dataMin !== undefined // #3703
  }

  /**
	 * Display a no-data message.
	 *
	 * @param {String} str An optional message to show in place of the default one
	 */
  chartPrototype.showNoData = function (str) {
    const chart = this
    const options = chart.options
    const text = str || options.lang.noData
    const noDataOptions = options.noData

    if (!chart.noDataLabel) {
      chart.noDataLabel = chart.renderer
        .label(
          text,
          0,
          0,
          null,
          null,
          null,
          noDataOptions.useHTML,
          null,
          'no-data'
        )
        .attr(noDataOptions.attr)
        .css(noDataOptions.style)
        .add()
      chart.noDataLabel.align(extend(chart.noDataLabel.getBBox(), noDataOptions.position), false, 'plotBox')
    }
  }

  /**
	 * Hide no-data message
	 */
  chartPrototype.hideNoData = function () {
    const chart = this
    if (chart.noDataLabel) {
      chart.noDataLabel = chart.noDataLabel.destroy()
    }
  }

  /**
	 * Returns true if there are data points within the plot area now
	 */
  chartPrototype.hasData = function () {
    const chart = this
    const series = chart.series
    let i = series.length

    while (i--) {
      if (series[i].hasData() && !series[i].options.isInternal) {
        return true
      }
    }

    return false
  }

  /**
	 * Show no-data message if there is no data in sight. Otherwise, hide it.
	 */
  function handleNoData () {
    const chart = this
    if (chart.hasData()) {
      chart.hideNoData()
    } else {
      chart.showNoData()
    }
  }

  /**
	 * Add event listener to handle automatic display of no-data message
	 */
  chartPrototype.callbacks.push(function (chart) {
    H.addEvent(chart, 'load', handleNoData)
    H.addEvent(chart, 'redraw', handleNoData)
  })
}(Highcharts))
