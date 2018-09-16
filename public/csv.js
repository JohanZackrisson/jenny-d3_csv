var read_csv = function () {

    d3.csv("TEMP.csv").then( (data) => {
        console.log(data)

        // normally a csv contains the column row as the first row of the file, but in this case it things our start time is a column
        const colName = data.columns[0]
        const start = +colName * 1000.0
        // the next row in the data in the sampling frequency
        const freq = +data[0][colName]

        // after that, all the samples follow
        const samples = data.slice(1)

        return samples.map( (sample, idx) => ({
            time: start + (1.0/freq) * idx * 1000.0,
            value: +sample[colName]
        }))
    }).then( (samples) => {
        console.log(samples)
        plot(samples)
    })
}
