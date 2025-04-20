# ClickJacking Defender - Комплексная защита от кликджекинга

## Обзор
Двухуровневое решение для защиты от:
- **Кликджекинга**: Защищает от подмены интерфейса
- **Даблкликджекинга**: Предотвращает атаки через быстрые двойные клики

## Способы установки

### Вариант 1: Расширение для браузера (для пользователей)
#### Установка в Chrome/Edge
1. **Из Chrome Web Store** (рекомендуется):
   - Найдите "ClickJacking Defender" в магазине расширений
   - Нажмите "Добавить в Chrome"

2. **Ручная установка** (для разработки):
   ```bash
   git clone https://github.com/iamNNP/Clickjacking-prevention.git
   ```
   - Перейдите на `chrome://extensions`
   - Включите "Режим разработчика" (переключатель справа)
   - Нажмите "Загрузить распакованное расширение"
   - Выберите папку с клонированным репозиторием

### Вариант 2: Интеграция для разработчиков
#### Быстрый старт
1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/iamNNP/Clickjacking-prevention.git
   cd Clickjacking-prevention
   ```

2. Соберите production-скрипты:
   ```bash
   npm install  # Если нужны кастомные настройки сборки
   node build.js
   ```

3. Подключите в свой проект:
   ```html
   <!-- Для защиты от кликджекинга -->
   <script src="dist/clickjacking.min.js"></script>
   
   <!-- Для защиты от даблкликджекинга -->
   <script src="dist/doubleclickjacking.min.js"></script>
   ```

## Настройка

### Для расширения браузера
Используйте popup-интерфейс для:
- Включения/выключения типов защиты
- Настройки чувствительности (задержка мыши)
- Изменения внешнего вида оверлея

### Для разработчиков
Настройка через `config.json`:
```json
{
  "clickJacking": true,
  "doubleClickJacking": true,
  "warningMessage": "Внимание: Возможна атака кликджекингом",
  "mouseDelay": 500,
  "overlayColor": "rgba(128,128,128,0.5)"
}
```

Или программно:
```javascript
window.dcjConfig = {
  enabled: true,
  mouseDelay: 1000,
  overlayColor: 'rgba(255,0,0,0.3)'
};
```

## Возможности

| Тип защиты          | Активация                  | Условие отключения               |
|---------------------|----------------------------|----------------------------------|
| Кликджекинг         | Обнаружение iframe         | Проверка same-origin             |
| Даблкликджекинг     | Загрузка страницы          | Непрерывное движение мыши (500мс+) |

**Дополнительные опции**:
- Горячие клавиши `C + J` для ручного отключения
- Настраиваемые визуальные предупреждения
- Поддержка динамического контента

## Рекомендации

1. **Максимальная защита**:
   ```html
   <!-- Используйте обе защиты -->
   <script src="clickjacking.min.js"></script>
   <script src="doubleclickjacking.min.js"></script>
   ```

2. **Для важных действий**:
   ```javascript
   // Усиленная защита для страниц входа
   window.dcjConfig = {
     mouseDelay: 1000,  // Задержка 1 секунда
     overlayColor: 'rgba(255,0,0,0.7)'  // Более заметное предупреждение
   };
   ```

## Решение проблем

**Проблема**: Оверлей не исчезает
- Убедитесь в непрерывном движении мыши в течение заданного времени
- Проверьте консоль на ошибки (`F12 > Console`)

**Проблема**: Конфликты с другими скриптами
- Обеспечьте правильный порядок загрузки (скрипты защиты первыми)
- При необходимости настройте z-index

## Поддержка

Для получения помощи:
- [Создайте Issue](https://github.com/iamNNP/Clickjacking-prevention/issues)
- Email: security-support@example.com

---

**Версия**: 2.1.0  
**Последнее обновление**: 2023-11-15  
**Лицензия**: MIT

# ClickJacking Defender - Comprehensive Protection Suite

## Overview
A dual-layer security solution offering:
- **Clickjacking Protection**: Defends against UI redressing attacks
- **DoubleClickjacking Protection**: Prevents rapid-click deception attacks

## Installation Options

### Option 1: Browser Extension (End Users)
#### Chrome/Edge Installation
1. **From Chrome Web Store** (recommended):
   - Search for "ClickJacking Defender" in Chrome Web Store
   - Click "Add to Chrome"

2. **Manual Installation** (development version):
   ```bash
   git clone https://github.com/iamNNP/Clickjacking-prevention.git
   ```
   - Navigate to `chrome://extensions`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the cloned repository folder

### Option 2: Developer Integration
#### Quick Start
1. Clone the repository:
   ```bash
   git clone https://github.com/iamNNP/Clickjacking-prevention.git
   cd Clickjacking-prevention
   ```

2. Build production scripts:
   ```bash
   npm install  # If using custom build options
   node build.js
   ```

3. Include in your project:
   ```html
   <!-- For clickjacking protection -->
   <script src="dist/clickjacking.min.js"></script>
   
   <!-- For doubleclick protection -->
   <script src="dist/doubleclickjacking.min.js"></script>
   ```

## Configuration

### Browser Extension
Use the popup UI to:
- Toggle protection types
- Adjust sensitivity (mouse delay)
- Customize overlay appearance

### Developer Integration
Configure via `config.json`:
```json
{
  "clickJacking": true,
  "doubleClickJacking": true,
  "warningMessage": "Security alert: Possible clickjacking attempt",
  "mouseDelay": 500,
  "overlayColor": "rgba(128,128,128,0.5)"
}
```

Or programmatically:
```javascript
window.dcjConfig = {
  enabled: true,
  mouseDelay: 1000,
  overlayColor: 'rgba(255,0,0,0.3)'
};
```

## Features

| Protection Type      | Activation Method          | Deactivation Trigger               |
|----------------------|----------------------------|------------------------------------|
| Clickjacking         | Detects iframes            | Same-origin verification           |
| DoubleClickjacking   | Page load                  | Sustained mouse movement (500ms+)  |

**Advanced Options**:
- `C + J` keyboard shortcut for manual override
- Customizable visual warnings
- Dynamic content detection

## Best Practices

1. **For Maximum Protection**:
   ```html
   <!-- Use both protections -->
   <script src="clickjacking.min.js"></script>
   <script src="doubleclickjacking.min.js"></script>
   ```

2. **For Sensitive Actions**:
   ```javascript
   // Configure tighter security for login pages
   window.dcjConfig = {
     mouseDelay: 1000,  // 1 second delay
     overlayColor: 'rgba(255,0,0,0.7)'  // More visible warning
   };
   ```

## Troubleshooting

**Issue**: Overlay not disappearing
- Verify mouse movement is continuous for the configured delay period
- Check console for error messages (`F12 > Console`)

**Issue**: Conflicts with other scripts
- Ensure proper load order (security scripts first)
- Adjust z-index values if needed

## Support

For additional help:
- [Open an Issue](https://github.com/iamNNP/Clickjacking-prevention/issues)
- Email: security-support@example.com

---

**Version**: 2.1.0  
**Last Updated**: 2023-11-15  
**License**: MIT