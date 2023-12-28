namespace next_api.Model
{
    public class WeatherData
{
    public string Date { get; set; }
    public double TemperatureC { get; set; }
    public double TemperatureF { get; set; }
    public string Summary { get; set; }

    public double TemperatureFahrenheit
    {
        get { return TemperatureC * 9 / 5 + 32; }
    }
}

}
