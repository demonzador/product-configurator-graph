# Product Configurator Graph

Приватний репозиторій для автоматизації візуалізації системи модифікацій.

## Структура

- `google-sheets/ConfigGraphTemplate`: шаблон Google Sheets з листами `Nodes` і `Edges`
- `google-sheets/AppsScript.gs`: скрипт для генерації JSON з таблиці
- `web/index.html`: HTML-сторінка, що відображає граф
- `web/graph.js`: логіка побудови графа (D3.js)
- `web/style.css`: стилізація

## Приклади даних

### `Nodes`

| id     | group        |
|--------|--------------|
| 12V    | Power        |
| 24V    | Power        |
| RS485  | Interface    |
| WiFi   | Interface    |
| Корпус A | Enclosure  |
| CE     | Certification|

### `Edges`

| source | target    | type        |
|--------|-----------|-------------|
| 12V    | Корпус A  | Compatible  |
| 24V    | Корпус A  | Compatible  |
| 12V    | WiFi      | Incompatible|
| WiFi   | CE        | Requires    |
| RS485  | CE        | Optional    |

## Використання

1. Відкрийте `google-sheets/ConfigGraphTemplate`, скопіюйте в свій Google Drive.
2. В Apps Script вставте `AppsScript.gs`, задеплойте як WebApp.
3. Вставте URL WebApp у `index.html`, відкрийте у браузері.