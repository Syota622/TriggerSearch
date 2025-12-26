import React, { useState } from "react";

const TriggerSearchSimple = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [headache, setHeadache] = useState(null);
  const [allergy, setAllergy] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [weather, setWeather] = useState(null);
  const [foods, setFoods] = useState([]);
  const [temperature, setTemperature] = useState(null);

  // 保存された記録データ（デモ用）
  const [savedRecords, setSavedRecords] = useState({
    "2025-12-25": {
      headache: true,
      allergy: false,
      sleep: 5,
      weather: "rainy",
      temperature: "cold",
      foods: ["bread", "milk", "coffee"],
    },
    "2025-12-24": {
      headache: false,
      allergy: true,
      sleep: 7,
      weather: "sunny",
      temperature: "cool",
      foods: ["rice", "fish", "vegetable"],
    },
    "2025-12-23": {
      headache: false,
      allergy: false,
      sleep: 8,
      weather: "cloudy",
      temperature: "cool",
      foods: ["rice", "meat", "vegetable", "fruit"],
    },
  });

  // カスタム項目の状態
  const [customWeathers, setCustomWeathers] = useState([]);
  const [customFoods, setCustomFoods] = useState([]);
  const [customTemperatures, setCustomTemperatures] = useState([]);

  // 編集モードの状態
  const [editingCategory, setEditingCategory] = useState(null);
  const [newItemName, setNewItemName] = useState("");
  const [newItemIcon, setNewItemIcon] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  /* カラーパレット */
  const colors = {
    primary: "#FF8C66",
    secondary: "#4ECDC4",
    yes: "#FF6B6B",
    yesBg: "#FFF0F0",
    no: "#4A90D9",
    noBg: "#F0F6FF",
    text: "#2D3748",
    textLight: "#718096",
    bg: "#FFFBF7",
    white: "#FFFFFF",
  };

  const phoneFrame = {
    width: "375px",
    height: "750px",
    backgroundColor: colors.bg,
    borderRadius: "40px",
    boxShadow: "0 25px 80px rgba(0,0,0,0.15), 0 0 0 12px #1a1a1a",
    overflow: "hidden",
  };

  /* デフォルト項目 */
  const defaultWeathers = [
    { id: "sunny", icon: "☀️", name: "晴れ" },
    { id: "cloudy", icon: "☁️", name: "曇り" },
    { id: "rainy", icon: "🌧️", name: "雨" },
    { id: "snowy", icon: "❄️", name: "雪" },
  ];

  const defaultFoods = [
    { id: "bread", icon: "🍞", name: "パン・小麦" },
    { id: "milk", icon: "🥛", name: "乳製品" },
    { id: "egg", icon: "🥚", name: "卵" },
    { id: "meat", icon: "🍖", name: "肉" },
    { id: "fish", icon: "🐟", name: "魚" },
    { id: "rice", icon: "🍚", name: "ごはん" },
    { id: "noodle", icon: "🍜", name: "麺類" },
    { id: "vegetable", icon: "🥬", name: "野菜" },
    { id: "fruit", icon: "🍎", name: "果物" },
    { id: "sweets", icon: "🍰", name: "お菓子" },
    { id: "coffee", icon: "☕", name: "コーヒー" },
    { id: "alcohol", icon: "🍺", name: "お酒" },
  ];

  const defaultTemperatures = [
    { id: "hot", icon: "🥵", name: "暑い" },
    { id: "warm", icon: "😊", name: "暖かい" },
    { id: "cool", icon: "🧥", name: "涼しい" },
    { id: "cold", icon: "🥶", name: "寒い" },
  ];

  const allWeathers = [...defaultWeathers, ...customWeathers];
  const allFoods = [...defaultFoods, ...customFoods];
  const allTemperatures = [...defaultTemperatures, ...customTemperatures];

  // 日付をフォーマット
  const formatDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };

  const formatDateJP = (date) => {
    const m = date.getMonth() + 1;
    const d = date.getDate();
    const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
    const w = weekdays[date.getDay()];
    return `${m}月${d}日（${w}）`;
  };

  // 記録画面を開く
  const openRecordScreen = (date, edit = false) => {
    setSelectedDate(date);
    const dateKey = formatDate(date);
    const record = savedRecords[dateKey];

    if (record) {
      setHeadache(record.headache);
      setAllergy(record.allergy);
      setSleep(record.sleep);
      setWeather(record.weather);
      setTemperature(record.temperature);
      setFoods(record.foods || []);
      setIsEditing(true);
    } else {
      setHeadache(null);
      setAllergy(null);
      setSleep(7);
      setWeather(null);
      setTemperature(null);
      setFoods([]);
      setIsEditing(false);
    }
    setCurrentScreen("record");
  };

  // 記録を保存
  const saveRecord = () => {
    const dateKey = formatDate(selectedDate);
    setSavedRecords({
      ...savedRecords,
      [dateKey]: {
        headache,
        allergy,
        sleep,
        weather,
        temperature,
        foods,
      },
    });
    setCurrentScreen("home");
  };

  // 記録を削除
  const deleteRecord = () => {
    const dateKey = formatDate(selectedDate);
    const newRecords = { ...savedRecords };
    delete newRecords[dateKey];
    setSavedRecords(newRecords);
    setCurrentScreen("calendar");
  };

  const toggleFood = (id) => {
    if (foods.includes(id)) {
      setFoods(foods.filter((f) => f !== id));
    } else {
      setFoods([...foods, id]);
    }
  };

  const addCustomItem = (category) => {
    if (!newItemName.trim()) return;

    const newItem = {
      id: `custom_${Date.now()}`,
      icon: newItemIcon || "📌",
      name: newItemName,
      isCustom: true,
    };

    switch (category) {
      case "weather":
        setCustomWeathers([...customWeathers, newItem]);
        break;
      case "food":
        setCustomFoods([...customFoods, newItem]);
        break;
      case "temperature":
        setCustomTemperatures([...customTemperatures, newItem]);
        break;
    }

    setNewItemName("");
    setNewItemIcon("");
    setEditingCategory(null);
  };

  const removeCustomItem = (category, id) => {
    switch (category) {
      case "weather":
        setCustomWeathers(customWeathers.filter((item) => item.id !== id));
        break;
      case "food":
        setCustomFoods(customFoods.filter((item) => item.id !== id));
        break;
      case "temperature":
        setCustomTemperatures(
          customTemperatures.filter((item) => item.id !== id)
        );
        break;
    }
  };

  const commonEmojis = [
    "📌",
    "⭐",
    "💊",
    "🌸",
    "🍕",
    "🍣",
    "🍺",
    "🌡️",
    "💨",
    "🌪️",
    "🌈",
    "⚡",
  ];

  /* ホーム画面 */
  const HomeScreen = () => (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px 32px 40px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "50px" }}>
        <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔍</div>
        <div
          style={{
            fontSize: "26px",
            fontWeight: "800",
            color: colors.text,
          }}
        >
          TriggerSearch
        </div>
      </div>

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <button
          onClick={() => openRecordScreen(new Date())}
          style={{
            background: colors.primary,
            border: "none",
            borderRadius: "24px",
            padding: "32px",
            color: "white",
            fontSize: "24px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: `0 12px 40px ${colors.primary}50`,
          }}
        >
          📝 今日の記録
        </button>

        <button
          onClick={() => setCurrentScreen("calendar")}
          style={{
            background: colors.white,
            border: `2px solid ${colors.primary}`,
            borderRadius: "24px",
            padding: "24px",
            color: colors.primary,
            fontSize: "20px",
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          📅 カレンダー
        </button>

        <button
          onClick={() => setCurrentScreen("result")}
          style={{
            background: colors.secondary,
            border: "none",
            borderRadius: "24px",
            padding: "32px",
            color: "white",
            fontSize: "24px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: `0 12px 40px ${colors.secondary}50`,
          }}
        >
          🔍 原因を見る
        </button>

        <button
          onClick={() => setCurrentScreen("settings")}
          style={{
            background: "transparent",
            border: `2px solid ${colors.textLight}`,
            borderRadius: "24px",
            padding: "18px",
            color: colors.textLight,
            fontSize: "16px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ⚙️ 設定
        </button>
      </div>
    </div>
  );

  /* カレンダー画面 */
  const CalendarScreen = () => {
    const [viewDate, setViewDate] = useState(new Date());

    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevMonth = () => {
      setViewDate(new Date(year, month - 1, 1));
    };

    const nextMonth = () => {
      setViewDate(new Date(year, month + 1, 1));
    };

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    const today = new Date();
    const isToday = (day) => {
      return (
        day === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      );
    };

    const hasRecord = (day) => {
      if (!day) return false;
      const dateKey = formatDate(new Date(year, month, day));
      return savedRecords[dateKey] !== undefined;
    };

    const getRecordInfo = (day) => {
      if (!day) return null;
      const dateKey = formatDate(new Date(year, month, day));
      return savedRecords[dateKey];
    };

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        <button
          onClick={() => setCurrentScreen("home")}
          style={{
            background: "none",
            border: "none",
            fontSize: "36px",
            cursor: "pointer",
            alignSelf: "flex-start",
            marginBottom: "8px",
          }}
        >
          ←
        </button>

        <div
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              fontSize: "24px",
              fontWeight: "800",
              color: colors.text,
            }}
          >
            📅 カレンダー
          </div>
        </div>

        {/* 月の切り替え */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "16px",
            padding: "0 8px",
          }}
        >
          <button
            onClick={prevMonth}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            ◀
          </button>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.text,
            }}
          >
            {year}年 {month + 1}月
          </div>
          <button
            onClick={nextMonth}
            style={{
              background: "none",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "8px",
            }}
          >
            ▶
          </button>
        </div>

        {/* 曜日ヘッダー */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
            marginBottom: "8px",
          }}
        >
          {["日", "月", "火", "水", "木", "金", "土"].map((w, i) => (
            <div
              key={w}
              style={{
                textAlign: "center",
                fontSize: "12px",
                fontWeight: "600",
                color:
                  i === 0 ? colors.yes : i === 6 ? colors.no : colors.textLight,
                padding: "8px 0",
              }}
            >
              {w}
            </div>
          ))}
        </div>

        {/* カレンダー本体 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
            flex: 1,
          }}
        >
          {days.map((day, index) => {
            const record = getRecordInfo(day);
            const dayOfWeek = index % 7;

            return (
              <div
                key={index}
                onClick={() => {
                  if (day) {
                    openRecordScreen(
                      new Date(year, month, day),
                      hasRecord(day)
                    );
                  }
                }}
                style={{
                  background: day
                    ? isToday(day)
                      ? colors.primary
                      : hasRecord(day)
                      ? colors.white
                      : colors.bg
                    : "transparent",
                  borderRadius: "12px",
                  padding: "8px 4px",
                  cursor: day ? "pointer" : "default",
                  border: hasRecord(day)
                    ? `2px solid ${colors.secondary}`
                    : "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "60px",
                }}
              >
                {day && (
                  <>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: isToday(day) ? "700" : "500",
                        color: isToday(day)
                          ? "white"
                          : dayOfWeek === 0
                          ? colors.yes
                          : dayOfWeek === 6
                          ? colors.no
                          : colors.text,
                        marginBottom: "4px",
                      }}
                    >
                      {day}
                    </div>
                    {record && (
                      <div
                        style={{
                          display: "flex",
                          gap: "2px",
                          flexWrap: "wrap",
                          justifyContent: "center",
                        }}
                      >
                        {record.headache && (
                          <span style={{ fontSize: "10px" }}>🤕</span>
                        )}
                        {record.allergy && (
                          <span style={{ fontSize: "10px" }}>🤧</span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* 凡例 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "16px",
            marginTop: "16px",
            fontSize: "12px",
            color: colors.textLight,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                background: colors.primary,
                borderRadius: "4px",
              }}
            />
            今日
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <div
              style={{
                width: "16px",
                height: "16px",
                background: colors.white,
                border: `2px solid ${colors.secondary}`,
                borderRadius: "4px",
              }}
            />
            記録あり
          </div>
        </div>
      </div>
    );
  };

  /* 追加ボタンコンポーネント */
  const AddButton = ({ category, label }) => (
    <button
      onClick={() => setEditingCategory(category)}
      style={{
        padding: "14px 8px",
        fontSize: "24px",
        border: `2px dashed ${colors.textLight}`,
        borderRadius: "14px",
        cursor: "pointer",
        background: "transparent",
        color: colors.textLight,
        transition: "all 0.2s",
      }}
      title={`${label}を追加`}
    >
      ＋
    </button>
  );

  /* 追加フォームコンポーネント */
  const AddItemForm = ({ category, label }) => (
    <div
      style={{
        background: colors.white,
        borderRadius: "16px",
        padding: "16px",
        marginTop: "12px",
        border: `2px solid ${colors.primary}`,
      }}
    >
      <div
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: colors.text,
          marginBottom: "12px",
        }}
      >
        {label}を追加
      </div>

      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            color: colors.textLight,
            marginBottom: "6px",
          }}
        >
          アイコンを選択
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {commonEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setNewItemIcon(emoji)}
              style={{
                width: "36px",
                height: "36px",
                fontSize: "18px",
                border:
                  newItemIcon === emoji
                    ? `2px solid ${colors.primary}`
                    : "1px solid #ddd",
                borderRadius: "8px",
                cursor: "pointer",
                background: newItemIcon === emoji ? colors.yesBg : colors.white,
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "12px" }}>
        <div
          style={{
            fontSize: "12px",
            color: colors.textLight,
            marginBottom: "6px",
          }}
        >
          名前を入力
        </div>
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="例: チョコレート"
          style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
        />
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <button
          onClick={() => {
            setEditingCategory(null);
            setNewItemName("");
            setNewItemIcon("");
          }}
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "14px",
            fontWeight: "600",
            border: "1px solid #ddd",
            borderRadius: "8px",
            cursor: "pointer",
            background: colors.white,
            color: colors.textLight,
          }}
        >
          キャンセル
        </button>
        <button
          onClick={() => addCustomItem(category)}
          style={{
            flex: 1,
            padding: "12px",
            fontSize: "14px",
            fontWeight: "600",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            background: colors.primary,
            color: "white",
          }}
        >
          追加する
        </button>
      </div>
    </div>
  );

  /* 記録画面 */
  const RecordScreen = () => (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "24px",
      }}
    >
      <button
        onClick={() => setCurrentScreen("home")}
        style={{
          background: "none",
          border: "none",
          fontSize: "36px",
          cursor: "pointer",
          alignSelf: "flex-start",
          marginBottom: "8px",
        }}
      >
        ←
      </button>

      {/* 日付表示 */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            fontWeight: "700",
            color: colors.text,
          }}
        >
          {formatDateJP(selectedDate)}
        </div>
        {isEditing && (
          <div
            style={{
              fontSize: "12px",
              color: colors.secondary,
              marginTop: "4px",
            }}
          >
            ✓ 記録済み（編集中）
          </div>
        )}
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* 頭痛 */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            🤕 頭痛は？
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setHeadache(true)}
              style={{
                flex: 1,
                padding: "20px",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                background: headache === true ? colors.yes : colors.yesBg,
                color: headache === true ? "white" : colors.yes,
              }}
            >
              あり
            </button>
            <button
              onClick={() => setHeadache(false)}
              style={{
                flex: 1,
                padding: "20px",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                background: headache === false ? colors.no : colors.noBg,
                color: headache === false ? "white" : colors.no,
              }}
            >
              なし
            </button>
          </div>
        </div>

        {/* アレルギー */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            🤧 アレルギーは？
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => setAllergy(true)}
              style={{
                flex: 1,
                padding: "20px",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                background: allergy === true ? colors.yes : colors.yesBg,
                color: allergy === true ? "white" : colors.yes,
              }}
            >
              あり
            </button>
            <button
              onClick={() => setAllergy(false)}
              style={{
                flex: 1,
                padding: "20px",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                borderRadius: "16px",
                cursor: "pointer",
                background: allergy === false ? colors.no : colors.noBg,
                color: allergy === false ? "white" : colors.no,
              }}
            >
              なし
            </button>
          </div>
        </div>

        {/* 睡眠 */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            😴 睡眠時間
          </div>
          <div
            style={{
              background: colors.white,
              borderRadius: "16px",
              padding: "16px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "36px",
                fontWeight: "800",
                color: colors.primary,
              }}
            >
              {sleep}時間
            </div>
            <input
              type="range"
              min="0"
              max="12"
              value={sleep}
              onChange={(e) => setSleep(Number(e.target.value))}
              style={{
                width: "100%",
                height: "12px",
                marginTop: "12px",
                accentColor: colors.primary,
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* 天気 */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            🌤️ 天気
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {allWeathers.map((item) => (
              <button
                key={item.id}
                onClick={() => setWeather(item.id)}
                style={{
                  flex: "0 0 calc(25% - 6px)",
                  padding: "12px 0",
                  fontSize: "24px",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background:
                    weather === item.id ? colors.secondary : colors.white,
                  boxShadow:
                    weather === item.id
                      ? `0 4px 15px ${colors.secondary}50`
                      : "none",
                }}
                title={item.name}
              >
                {item.icon}
              </button>
            ))}
            <AddButton category="weather" label="天気" />
          </div>
          {editingCategory === "weather" && (
            <AddItemForm category="weather" label="天気" />
          )}
        </div>

        {/* 気温 */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            🌡️ 気温
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {allTemperatures.map((item) => (
              <button
                key={item.id}
                onClick={() => setTemperature(item.id)}
                style={{
                  flex: "0 0 calc(25% - 6px)",
                  padding: "12px 0",
                  fontSize: "24px",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background:
                    temperature === item.id ? colors.secondary : colors.white,
                  boxShadow:
                    temperature === item.id
                      ? `0 4px 15px ${colors.secondary}50`
                      : "none",
                }}
                title={item.name}
              >
                {item.icon}
              </button>
            ))}
            <AddButton category="temperature" label="気温" />
          </div>
          {editingCategory === "temperature" && (
            <AddItemForm category="temperature" label="気温" />
          )}
        </div>

        {/* 食事 */}
        <div style={{ marginBottom: "16px" }}>
          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "10px",
              textAlign: "center",
            }}
          >
            🍽️ 今日食べたもの
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "8px",
            }}
          >
            {allFoods.map((food) => (
              <button
                key={food.id}
                onClick={() => toggleFood(food.id)}
                style={{
                  padding: "12px 6px",
                  fontSize: "24px",
                  border: "none",
                  borderRadius: "12px",
                  cursor: "pointer",
                  background: foods.includes(food.id)
                    ? colors.primary
                    : colors.white,
                  boxShadow: foods.includes(food.id)
                    ? `0 4px 15px ${colors.primary}40`
                    : "none",
                }}
                title={food.name}
              >
                {food.icon}
              </button>
            ))}
            <AddButton category="food" label="食べ物" />
          </div>
          {editingCategory === "food" && (
            <AddItemForm category="food" label="食べ物" />
          )}
        </div>
      </div>

      {/* ボタンエリア */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <button
          onClick={saveRecord}
          style={{
            background: colors.primary,
            border: "none",
            borderRadius: "16px",
            padding: "18px",
            color: "white",
            fontSize: "20px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: `0 10px 40px ${colors.primary}50`,
          }}
        >
          {isEditing ? "更新する" : "保存する"}
        </button>

        {isEditing && (
          <button
            onClick={deleteRecord}
            style={{
              background: "transparent",
              border: `2px solid ${colors.yes}`,
              borderRadius: "16px",
              padding: "14px",
              color: colors.yes,
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            この記録を削除
          </button>
        )}
      </div>
    </div>
  );

  /* 結果画面 */
  const ResultScreen = () => {
    const recordCount = Object.keys(savedRecords).length;

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        <button
          onClick={() => setCurrentScreen("home")}
          style={{
            background: "none",
            border: "none",
            fontSize: "36px",
            cursor: "pointer",
            alignSelf: "flex-start",
            marginBottom: "16px",
          }}
        >
          ←
        </button>

        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: colors.text,
            }}
          >
            🔍 原因の分析
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {recordCount < 7 ? (
            <div
              style={{
                background: colors.white,
                borderRadius: "20px",
                padding: "40px 24px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📊</div>
              <div
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: colors.text,
                  marginBottom: "12px",
                }}
              >
                もう少し記録がたまると
                <br />
                原因がわかります
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: colors.textLight,
                  lineHeight: "1.6",
                }}
              >
                現在 {recordCount}日分の記録
                <br />
                あと {7 - recordCount}日分で分析できます
              </div>
            </div>
          ) : (
            <>
              <div
                style={{
                  background: colors.white,
                  borderRadius: "20px",
                  padding: "24px",
                  marginBottom: "16px",
                  borderLeft: `6px solid ${colors.yes}`,
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>😴</div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.text,
                    marginBottom: "12px",
                  }}
                >
                  睡眠不足
                </div>
                <div
                  style={{
                    background: colors.yesBg,
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "18px",
                    color: colors.text,
                    lineHeight: "1.6",
                  }}
                >
                  6時間未満の日は
                  <br />
                  <strong>頭痛</strong>になりやすい
                </div>
              </div>

              <div
                style={{
                  background: colors.white,
                  borderRadius: "20px",
                  padding: "24px",
                  marginBottom: "16px",
                  borderLeft: `6px solid ${colors.yes}`,
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🥶</div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.text,
                    marginBottom: "12px",
                  }}
                >
                  寒い日
                </div>
                <div
                  style={{
                    background: colors.yesBg,
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "18px",
                    color: colors.text,
                    lineHeight: "1.6",
                  }}
                >
                  寒い日は
                  <br />
                  <strong>頭痛</strong>になりやすい
                </div>
              </div>

              <div
                style={{
                  background: colors.white,
                  borderRadius: "20px",
                  padding: "24px",
                  marginBottom: "16px",
                  borderLeft: `6px solid ${colors.secondary}`,
                }}
              >
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>🥛</div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "700",
                    color: colors.text,
                    marginBottom: "12px",
                  }}
                >
                  乳製品
                </div>
                <div
                  style={{
                    background: `${colors.secondary}20`,
                    borderRadius: "12px",
                    padding: "16px",
                    fontSize: "18px",
                    color: colors.text,
                    lineHeight: "1.6",
                  }}
                >
                  乳製品を食べた日は
                  <br />
                  <strong>アレルギー</strong>が出やすい
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  /* 設定画面 */
  const SettingsScreen = () => {
    const [notifyEnabled, setNotifyEnabled] = useState(true);
    const [notifyTime, setNotifyTime] = useState("21:00");

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
        }}
      >
        <button
          onClick={() => setCurrentScreen("home")}
          style={{
            background: "none",
            border: "none",
            fontSize: "36px",
            cursor: "pointer",
            alignSelf: "flex-start",
            marginBottom: "16px",
          }}
        >
          ←
        </button>

        <div
          style={{
            textAlign: "center",
            marginBottom: "24px",
          }}
        >
          <div
            style={{
              fontSize: "26px",
              fontWeight: "800",
              color: colors.text,
            }}
          >
            ⚙️ 設定
          </div>
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {/* 通知設定 */}
          <div
            style={{
              background: colors.white,
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "20px",
                    fontWeight: "700",
                    color: colors.text,
                    marginBottom: "4px",
                  }}
                >
                  🔔 リマインダー
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                  }}
                >
                  記録を忘れないように通知
                </div>
              </div>
              <button
                onClick={() => setNotifyEnabled(!notifyEnabled)}
                style={{
                  width: "60px",
                  height: "34px",
                  borderRadius: "17px",
                  border: "none",
                  cursor: "pointer",
                  background: notifyEnabled ? colors.secondary : "#ddd",
                  position: "relative",
                  transition: "all 0.3s",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "14px",
                    background: "white",
                    position: "absolute",
                    top: "3px",
                    left: notifyEnabled ? "29px" : "3px",
                    transition: "all 0.3s",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                />
              </button>
            </div>

            {notifyEnabled && (
              <div
                style={{
                  background: colors.bg,
                  borderRadius: "12px",
                  padding: "16px",
                }}
              >
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                    marginBottom: "8px",
                  }}
                >
                  通知する時間
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["20:00", "21:00", "22:00"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setNotifyTime(time)}
                      style={{
                        flex: 1,
                        padding: "14px",
                        fontSize: "18px",
                        fontWeight: "600",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        background:
                          notifyTime === time ? colors.secondary : colors.white,
                        color: notifyTime === time ? "white" : colors.text,
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* カスタム項目管理 */}
          <div
            style={{
              background: colors.white,
              borderRadius: "20px",
              padding: "24px",
              marginBottom: "16px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "16px",
              }}
            >
              📝 追加した項目
            </div>

            {customWeathers.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                    marginBottom: "8px",
                  }}
                >
                  天気
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {customWeathers.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: colors.bg,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                      <button
                        onClick={() => removeCustomItem("weather", item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: colors.yes,
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 4px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {customTemperatures.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                    marginBottom: "8px",
                  }}
                >
                  気温
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {customTemperatures.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: colors.bg,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                      <button
                        onClick={() => removeCustomItem("temperature", item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: colors.yes,
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 4px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {customFoods.length > 0 && (
              <div style={{ marginBottom: "16px" }}>
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                    marginBottom: "8px",
                  }}
                >
                  食べ物
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {customFoods.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                        background: colors.bg,
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "14px",
                      }}
                    >
                      <span>{item.icon}</span>
                      <span>{item.name}</span>
                      <button
                        onClick={() => removeCustomItem("food", item.id)}
                        style={{
                          background: "none",
                          border: "none",
                          color: colors.yes,
                          cursor: "pointer",
                          fontSize: "16px",
                          padding: "0 4px",
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {customWeathers.length === 0 &&
              customFoods.length === 0 &&
              customTemperatures.length === 0 && (
                <div style={{ fontSize: "14px", color: colors.textLight }}>
                  記録画面の「＋」ボタンから追加できます
                </div>
              )}
          </div>

          {/* データ管理 */}
          <div
            style={{
              background: colors.white,
              borderRadius: "20px",
              padding: "24px",
            }}
          >
            <div
              style={{
                fontSize: "20px",
                fontWeight: "700",
                color: colors.text,
                marginBottom: "4px",
              }}
            >
              📊 記録データ
            </div>
            <div
              style={{
                fontSize: "14px",
                color: colors.textLight,
                marginBottom: "16px",
              }}
            >
              現在 {Object.keys(savedRecords).length}日分の記録があります
            </div>
            <button
              onClick={() => setSavedRecords({})}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "16px",
                fontWeight: "600",
                border: `2px solid ${colors.yes}`,
                borderRadius: "10px",
                cursor: "pointer",
                background: "transparent",
                color: colors.yes,
              }}
            >
              データをリセット
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #1a1a2e 0%, #16213e 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div>
        <div style={phoneFrame}>
          {currentScreen === "home" && <HomeScreen />}
          {currentScreen === "calendar" && <CalendarScreen />}
          {currentScreen === "record" && <RecordScreen />}
          {currentScreen === "result" && <ResultScreen />}
          {currentScreen === "settings" && <SettingsScreen />}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          {["home", "calendar", "record", "result", "settings"].map((s) => (
            <div
              key={s}
              onClick={() => setCurrentScreen(s)}
              style={{
                width: currentScreen === s ? "24px" : "10px",
                height: "10px",
                borderRadius: "5px",
                background:
                  currentScreen === s
                    ? colors.primary
                    : "rgba(255,255,255,0.3)",
                cursor: "pointer",
                transition: "all 0.3s",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TriggerSearchSimple;
