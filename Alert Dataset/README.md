# 資料集特徵解說

### 基本欄位

- **log**: 日誌訊息的原始資料
- **target**
- **description**: 事件的描述

### 網絡來源相關欄位

- **Source IP**: 來源 IP 地址。
- **Timestamp**: 事件的發生時間戳。
- **Port**
- **Country**: 來源 IP 所屬的國家。
- **Longitude**: 來源 IP 對應的經度。
- **Latitude**: 來源 IP 對應的緯度。

### 規則相關欄位

- **Rule ID**: 事件的 Rule 識別 ID，能識別事件觸發規則、分類相關類似的事件。
- **Rule Level**: 事件的嚴重程度。
- **Rule Description**: 事件觸發規則的描述信息。
- **Rule Groups**: 事件規則的分組信息。
- **Rule Mail**: 是否應在警報觸發時發送郵件通知。

### MITRE ATT&CK 相關欄位

- **MITRE Technique**: 與事件相關的 MITRE ATT&CK 技術。
- **MITRE ID**: MITRE ATT&CK 技術的識別 ID。
- **MITRE Tactic**: 與事件相關的 MITRE ATT&CK 戰術。

### 其他標準規範欄位

- **Nist 800-53**: 美國 NIST 制訂的資安相關標準規範。
- **GDPR**: 歐盟制定的通用數據保護條例（GDPR），為個人數據收集/處理/傳輸建制的框架。
- **GPG13**: 英國政府制定的 Good Practice Guide 13，一個英國用來保護敏感資料的監控框架。
- **HIPAA**: 《美國健康保險流通與責任法案》（HIPAA），規範如何處理和保護健康資料。
- **TSC**: Trust Services Criteria，用於評估/報告組織的安全性、可用性等。
- **PCI DSS**: 保護持卡人交易資料與卡片認證的安全政策。

### 事件觸發相關欄位
- **Firedtimes**: 規則觸發次數。
     
