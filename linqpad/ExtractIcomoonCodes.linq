<Query Kind="Statements">
  <NuGetReference>Newtonsoft.Json</NuGetReference>
  <Namespace>Newtonsoft.Json</Namespace>
  <Namespace>Newtonsoft.Json.Bson</Namespace>
  <Namespace>Newtonsoft.Json.Converters</Namespace>
  <Namespace>Newtonsoft.Json.Linq</Namespace>
  <Namespace>Newtonsoft.Json.Schema</Namespace>
  <Namespace>Newtonsoft.Json.Serialization</Namespace>
</Query>

var icomoonCssFile = @"C:\src\github\asset-view\icomoon\icomoon.css";
var icomoonOutputJsonFile = @"C:\src\github\asset-view\icomoon\icomoon.json";

var lines = File.ReadAllLines(icomoonCssFile);

var sb = new StringBuilder();
var sw = new StringWriter(sb);

using (JsonWriter writer = new JsonTextWriter(sw))
{

	writer.Formatting = Newtonsoft.Json.Formatting.Indented;

	writer.WriteStartArray();

	var textInfo = Thread.CurrentThread.CurrentCulture.TextInfo;

	for (var l = 0; l < lines.Length; l++)
	{
		var line = lines[l];

		if (line.StartsWith(".icon-"))
		{
			var nextLine = lines[l + 1].Trim();

			if (nextLine.StartsWith("content"))
			{
				// extract the CSS class name
				var className = line.Split(":".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)[0].TrimStart(".".ToCharArray());
				
				// create the svg name
				var svgPath = string.Format("svg/{0}.svg", className.Replace("icon-", ""));

				// make a nice name for the class

				string niceName = string.Empty;

				className.Split(" -".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).Where(token => token != "icon").ToList().ForEach((token) =>
				{
					niceName += textInfo.ToTitleCase(token) + " ";
				});
				
				niceName = niceName.Trim();
				
				// extract the hex code
				var hexCode = "&#x" + nextLine
					.Split(":".ToCharArray(), StringSplitOptions.RemoveEmptyEntries)[1]
					.Trim(" \\//\";".ToCharArray());

				// store
				writer.WriteStartObject();
				writer.WritePropertyName("className");
				writer.WriteValue(className);
				writer.WritePropertyName("svgPath");
				writer.WriteValue(svgPath);
				writer.WritePropertyName("hexCode");
				writer.WriteValue(hexCode);
				writer.WritePropertyName("niceName");
				writer.WriteValue(niceName);
				writer.WriteEndObject();
			}
		}
	}
	writer.WriteEndArray();
}

File.WriteAllText(icomoonOutputJsonFile, sb.ToString());