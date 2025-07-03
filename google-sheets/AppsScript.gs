function doGet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nodesSheet = ss.getSheetByName("Nodes");
  const edgesSheet = ss.getSheetByName("Edges");

  const nodes = nodesSheet.getDataRange().getValues().slice(1).map(r => ({
    id: r[0],
    group: r[1]
  }));

  const links = edgesSheet.getDataRange().getValues().slice(1).map(r => ({
    source: r[0],
    target: r[1],
    type: r[2]
  }));

  return ContentService.createTextOutput(JSON.stringify({ nodes, links })).setMimeType(ContentService.MimeType.JSON);
}