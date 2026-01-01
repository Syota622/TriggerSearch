import React, { useState, useEffect } from "react";

const TriggerSearchApp = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [headache, setHeadache] = useState(null);
  const [allergy, setAllergy] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [weather, setWeather] = useState(null);
  const [foods, setFoods] = useState([]);
  const [temperature, setTemperature] = useState(null);
  const [fadeIn, setFadeIn] = useState(true);

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

  /* Headspace風カラーパレット */
  const colors = {
    // メインカラー（温かみのあるオレンジ〜コーラル）
    primary: "#F47D6C",
    primaryLight: "#FFB5A7",
    primaryDark: "#E85D4C",

    // セカンダリ（落ち着いたティール）
    secondary: "#5BA199",
    secondaryLight: "#7DBDB6",
    secondaryDark: "#458B83",

    // アクセント（優しいイエロー）
    accent: "#F9C74F",
    accentLight: "#FCE39E",

    // 背景（クリーミーな温かみ）
    bgPrimary: "#FFF8F0",
    bgSecondary: "#FEF0E6",
    bgCard: "#FFFFFF",

    // テキスト
    textPrimary: "#2D3142",
    textSecondary: "#6B7280",
    textLight: "#9CA3AF",

    // 症状
    symptomYes: "#E07A5F",
    symptomYesBg: "#FDF0ED",
    symptomNo: "#81B29A",
    symptomNoBg: "#EDF5F1",

    // その他
    white: "#FFFFFF",
    shadow: "rgba(45, 49, 66, 0.08)",
    shadowDark: "rgba(45, 49, 66, 0.15)",
  };

  const phoneFrame = {
    width: "375px",
    height: "812px",
    background: `linear-gradient(180deg, ${colors.bgPrimary} 0%, ${colors.bgSecondary} 100%)`,
    borderRadius: "44px",
    boxShadow: `0 50px 100px -20px ${colors.shadowDark}, 0 0 0 12px #1a1a1a`,
    overflow: "hidden",
    position: "relative",
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

  // 画面遷移アニメーション
  const navigateTo = (screen) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentScreen(screen);
      setFadeIn(true);
    }, 150);
  };

  // 日付フォーマット
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
  const openRecordScreen = (date) => {
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
    navigateTo("record");
  };

  // 記録を保存
  const saveRecord = () => {
    const dateKey = formatDate(selectedDate);
    setSavedRecords({
      ...savedRecords,
      [dateKey]: { headache, allergy, sleep, weather, temperature, foods },
    });
    navigateTo("home");
  };

  // 記録を削除
  const deleteRecord = () => {
    const dateKey = formatDate(selectedDate);
    const newRecords = { ...savedRecords };
    delete newRecords[dateKey];
    setSavedRecords(newRecords);
    navigateTo("calendar");
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

  /* 共通スタイル */
  const cardStyle = {
    background: colors.bgCard,
    borderRadius: "24px",
    padding: "24px",
    boxShadow: `0 4px 20px ${colors.shadow}, 0 1px 3px ${colors.shadow}`,
    transition: "all 0.3s ease",
  };

  const buttonBaseStyle = {
    border: "none",
    cursor: "pointer",
    fontWeight: "600",
    transition: "all 0.2s ease",
    fontFamily: "inherit",
  };

  /* イラスト風デコレーション */
  const DecoCircle = ({
    size,
    color,
    top,
    left,
    right,
    bottom,
    opacity = 0.5,
  }) => (
    <div
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        opacity,
        top,
        left,
        right,
        bottom,
        pointerEvents: "none",
      }}
    />
  );

  const DecoBlob = ({ top, right, color }) => (
    <svg
      style={{
        position: "absolute",
        top,
        right,
        opacity: 0.6,
        pointerEvents: "none",
      }}
      width="120"
      height="120"
      viewBox="0 0 200 200"
    >
      <path
        fill={color}
        d="M47.5,-57.2C59.4,-46.9,65.5,-30.3,67.8,-13.4C70.1,3.5,68.6,20.7,60.7,34.4C52.8,48.1,38.5,58.3,22.4,64.1C6.3,69.9,-11.6,71.3,-27.8,66.1C-44,60.9,-58.5,49.1,-66.3,33.8C-74.1,18.5,-75.2,-0.3,-69.6,-16.6C-64,-32.9,-51.7,-46.7,-37.7,-56.5C-23.7,-66.3,-8,-72.1,5.8,-78.8C19.6,-85.5,35.6,-67.5,47.5,-57.2Z"
        transform="translate(100 100)"
      />
    </svg>
  );

  /* ホーム画面 */
  const HomeScreen = () => {
    const today = new Date();
    const greeting =
      today.getHours() < 12
        ? "おはようございます"
        : today.getHours() < 18
        ? "こんにちは"
        : "こんばんは";
    const recordCount = Object.keys(savedRecords).length;

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 24px 32px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.15s ease",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* デコレーション */}
        <DecoCircle
          size="180px"
          color={colors.primaryLight}
          top="-60px"
          right="-60px"
          opacity={0.3}
        />
        <DecoCircle
          size="100px"
          color={colors.accent}
          bottom="20%"
          left="-40px"
          opacity={0.2}
        />
        <DecoBlob top="15%" right="-20px" color={colors.secondaryLight} />

        {/* ヘッダー */}
        <div style={{ marginBottom: "32px", position: "relative", zIndex: 1 }}>
          <p
            style={{
              fontSize: "16px",
              color: colors.textSecondary,
              marginBottom: "4px",
            }}
          >
            {greeting} 👋
          </p>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "800",
              color: colors.textPrimary,
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            今日の調子は
            <br />
            いかがですか？
          </h1>
        </div>

        {/* ステータスカード */}
        <div
          style={{
            ...cardStyle,
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
            marginBottom: "20px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <DecoCircle
            size="80px"
            color="rgba(255,255,255,0.1)"
            top="-20px"
            right="-20px"
            opacity={1}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <p
              style={{
                color: "rgba(255,255,255,0.9)",
                fontSize: "14px",
                marginBottom: "8px",
              }}
            >
              これまでの記録
            </p>
            <p
              style={{
                color: colors.white,
                fontSize: "36px",
                fontWeight: "800",
                margin: 0,
              }}
            >
              {recordCount}
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                  marginLeft: "4px",
                }}
              >
                日分
              </span>
            </p>
          </div>
        </div>

        {/* メインボタン */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <button
            onClick={() => openRecordScreen(new Date())}
            style={{
              ...buttonBaseStyle,
              ...cardStyle,
              padding: "28px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
              background: colors.bgCard,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 30px ${colors.shadowDark}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadow}`;
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryLight} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              ✏️
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                今日の記録
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: "4px 0 0",
                }}
              >
                体調と生活を記録しましょう
              </p>
            </div>
          </button>

          <button
            onClick={() => navigateTo("calendar")}
            style={{
              ...buttonBaseStyle,
              ...cardStyle,
              padding: "28px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 30px ${colors.shadowDark}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadow}`;
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              📅
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                カレンダー
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: "4px 0 0",
                }}
              >
                過去の記録を確認・編集
              </p>
            </div>
          </button>

          <button
            onClick={() => navigateTo("result")}
            style={{
              ...buttonBaseStyle,
              ...cardStyle,
              padding: "28px 24px",
              display: "flex",
              alignItems: "center",
              gap: "16px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = `0 8px 30px ${colors.shadowDark}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadow}`;
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryLight} 100%)`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "28px",
              }}
            >
              🔍
            </div>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: colors.textPrimary,
                  margin: 0,
                }}
              >
                原因を見る
              </p>
              <p
                style={{
                  fontSize: "13px",
                  color: colors.textSecondary,
                  margin: "4px 0 0",
                }}
              >
                あなたのトリガーを分析
              </p>
            </div>
          </button>
        </div>

        {/* 設定ボタン */}
        <button
          onClick={() => navigateTo("settings")}
          style={{
            ...buttonBaseStyle,
            background: "transparent",
            padding: "16px",
            color: colors.textSecondary,
            fontSize: "15px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>⚙️</span> 設定
        </button>
      </div>
    );
  };

  /* カレンダー画面 */
  const CalendarScreen = () => {
    const [viewDate, setViewDate] = useState(new Date());
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];
    for (let i = 0; i < startDayOfWeek; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);

    const today = new Date();
    const isToday = (day) =>
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();
    const hasRecord = (day) =>
      day && savedRecords[formatDate(new Date(year, month, day))];
    const getRecordInfo = (day) =>
      day && savedRecords[formatDate(new Date(year, month, day))];

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => navigateTo("home")}
            style={{
              ...buttonBaseStyle,
              background: colors.bgCard,
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              fontSize: "20px",
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            ←
          </button>
          <h2
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "700",
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            カレンダー
          </h2>
          <div style={{ width: "44px" }} />
        </div>

        {/* 月切り替え */}
        <div
          style={{
            ...cardStyle,
            padding: "16px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => setViewDate(new Date(year, month - 1, 1))}
            style={{
              ...buttonBaseStyle,
              background: "none",
              fontSize: "20px",
              padding: "8px",
            }}
          >
            ◀
          </button>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.textPrimary,
            }}
          >
            {year}年 {month + 1}月
          </span>
          <button
            onClick={() => setViewDate(new Date(year, month + 1, 1))}
            style={{
              ...buttonBaseStyle,
              background: "none",
              fontSize: "20px",
              padding: "8px",
            }}
          >
            ▶
          </button>
        </div>

        {/* カレンダー */}
        <div style={{ ...cardStyle, flex: 1, padding: "20px" }}>
          {/* 曜日ヘッダー */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "4px",
              marginBottom: "12px",
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
                    i === 0
                      ? colors.symptomYes
                      : i === 6
                      ? colors.secondary
                      : colors.textLight,
                  padding: "8px 0",
                }}
              >
                {w}
              </div>
            ))}
          </div>

          {/* 日付 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(7, 1fr)",
              gap: "6px",
            }}
          >
            {days.map((day, index) => {
              const record = getRecordInfo(day);
              const dayOfWeek = index % 7;
              return (
                <div
                  key={index}
                  onClick={() =>
                    day && openRecordScreen(new Date(year, month, day))
                  }
                  style={{
                    aspectRatio: "1",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: day ? "pointer" : "default",
                    background: day
                      ? isToday(day)
                        ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                        : hasRecord(day)
                        ? colors.bgSecondary
                        : "transparent"
                      : "transparent",
                    border:
                      hasRecord(day) && !isToday(day)
                        ? `2px solid ${colors.secondary}`
                        : "none",
                    transition: "all 0.2s ease",
                  }}
                >
                  {day && (
                    <>
                      <span
                        style={{
                          fontSize: "14px",
                          fontWeight: isToday(day) ? "700" : "500",
                          color: isToday(day)
                            ? colors.white
                            : dayOfWeek === 0
                            ? colors.symptomYes
                            : dayOfWeek === 6
                            ? colors.secondary
                            : colors.textPrimary,
                        }}
                      >
                        {day}
                      </span>
                      {record && (
                        <div
                          style={{
                            display: "flex",
                            gap: "1px",
                            marginTop: "2px",
                          }}
                        >
                          {record.headache && (
                            <span style={{ fontSize: "8px" }}>🤕</span>
                          )}
                          {record.allergy && (
                            <span style={{ fontSize: "8px" }}>🤧</span>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 凡例 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginTop: "16px",
            fontSize: "12px",
            color: colors.textSecondary,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              }}
            />
            今日
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "4px",
                background: colors.bgSecondary,
                border: `2px solid ${colors.secondary}`,
              }}
            />
            記録あり
          </div>
        </div>
      </div>
    );
  };

  /* 記録画面 */
  const RecordScreen = () => {
    const SectionTitle = ({ icon, title }) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "12px",
        }}
      >
        <span style={{ fontSize: "20px" }}>{icon}</span>
        <span
          style={{
            fontSize: "16px",
            fontWeight: "700",
            color: colors.textPrimary,
          }}
        >
          {title}
        </span>
      </div>
    );

    const SymptomButton = ({ isYes, selected, onClick, label }) => (
      <button
        onClick={onClick}
        style={{
          ...buttonBaseStyle,
          flex: 1,
          padding: "18px",
          borderRadius: "16px",
          fontSize: "16px",
          background: selected
            ? isYes
              ? `linear-gradient(135deg, ${colors.symptomYes} 0%, ${colors.primaryDark} 100%)`
              : `linear-gradient(135deg, ${colors.symptomNo} 0%, ${colors.secondaryDark} 100%)`
            : isYes
            ? colors.symptomYesBg
            : colors.symptomNoBg,
          color: selected
            ? colors.white
            : isYes
            ? colors.symptomYes
            : colors.symptomNo,
          boxShadow: selected
            ? `0 4px 15px ${isYes ? colors.symptomYes : colors.symptomNo}40`
            : "none",
        }}
      >
        {label}
      </button>
    );

    const IconButton = ({ item, selected, onClick, selectedColor }) => (
      <button
        onClick={onClick}
        style={{
          ...buttonBaseStyle,
          flex: "0 0 calc(25% - 9px)",
          aspectRatio: "1",
          borderRadius: "16px",
          fontSize: "26px",
          background: selected
            ? `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}dd 100%)`
            : colors.bgCard,
          boxShadow: selected
            ? `0 4px 15px ${selectedColor}50`
            : `0 2px 8px ${colors.shadow}`,
          transform: selected ? "scale(1.05)" : "scale(1)",
        }}
        title={item.name}
      >
        {item.icon}
      </button>
    );

    const AddButton = ({ category, label }) => (
      <button
        onClick={() => setEditingCategory(category)}
        style={{
          ...buttonBaseStyle,
          flex: "0 0 calc(25% - 9px)",
          aspectRatio: "1",
          borderRadius: "16px",
          fontSize: "24px",
          background: "transparent",
          border: `2px dashed ${colors.textLight}`,
          color: colors.textLight,
        }}
        title={`${label}を追加`}
      >
        ＋
      </button>
    );

    const AddItemForm = ({ category, label }) => (
      <div
        style={{
          ...cardStyle,
          marginTop: "12px",
          border: `2px solid ${colors.primary}`,
        }}
      >
        <p
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: colors.textPrimary,
            marginBottom: "12px",
          }}
        >
          {label}を追加
        </p>
        <div style={{ marginBottom: "12px" }}>
          <p
            style={{
              fontSize: "12px",
              color: colors.textSecondary,
              marginBottom: "6px",
            }}
          >
            アイコンを選択
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {commonEmojis.map((emoji) => (
              <button
                key={emoji}
                onClick={() => setNewItemIcon(emoji)}
                style={{
                  ...buttonBaseStyle,
                  width: "40px",
                  height: "40px",
                  fontSize: "18px",
                  borderRadius: "10px",
                  background:
                    newItemIcon === emoji
                      ? colors.primaryLight
                      : colors.bgSecondary,
                  border:
                    newItemIcon === emoji
                      ? `2px solid ${colors.primary}`
                      : "none",
                }}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: "12px" }}>
          <p
            style={{
              fontSize: "12px",
              color: colors.textSecondary,
              marginBottom: "6px",
            }}
          >
            名前を入力
          </p>
          <input
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="例: チョコレート"
            style={{
              width: "100%",
              padding: "14px",
              fontSize: "16px",
              border: `1px solid ${colors.textLight}`,
              borderRadius: "12px",
              boxSizing: "border-box",
              fontFamily: "inherit",
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
              ...buttonBaseStyle,
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              background: colors.bgSecondary,
              color: colors.textSecondary,
            }}
          >
            キャンセル
          </button>
          <button
            onClick={() => addCustomItem(category)}
            style={{
              ...buttonBaseStyle,
              flex: 1,
              padding: "14px",
              borderRadius: "12px",
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              color: colors.white,
            }}
          >
            追加する
          </button>
        </div>
      </div>
    );

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => navigateTo("home")}
            style={{
              ...buttonBaseStyle,
              background: colors.bgCard,
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              fontSize: "20px",
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            ←
          </button>
          <div style={{ flex: 1, textAlign: "center" }}>
            <p
              style={{
                fontSize: "18px",
                fontWeight: "700",
                color: colors.textPrimary,
                margin: 0,
              }}
            >
              {formatDateJP(selectedDate)}
            </p>
            {isEditing && (
              <p
                style={{
                  fontSize: "12px",
                  color: colors.secondary,
                  margin: "4px 0 0",
                }}
              >
                ✓ 記録済み
              </p>
            )}
          </div>
          <div style={{ width: "44px" }} />
        </div>

        <div style={{ flex: 1, overflow: "auto", paddingBottom: "16px" }}>
          {/* 頭痛 */}
          <div style={{ marginBottom: "24px" }}>
            <SectionTitle icon="🤕" title="頭痛は？" />
            <div style={{ display: "flex", gap: "12px" }}>
              <SymptomButton
                isYes={true}
                selected={headache === true}
                onClick={() => setHeadache(true)}
                label="あり"
              />
              <SymptomButton
                isYes={false}
                selected={headache === false}
                onClick={() => setHeadache(false)}
                label="なし"
              />
            </div>
          </div>

          {/* アレルギー */}
          <div style={{ marginBottom: "24px" }}>
            <SectionTitle icon="🤧" title="アレルギーは？" />
            <div style={{ display: "flex", gap: "12px" }}>
              <SymptomButton
                isYes={true}
                selected={allergy === true}
                onClick={() => setAllergy(true)}
                label="あり"
              />
              <SymptomButton
                isYes={false}
                selected={allergy === false}
                onClick={() => setAllergy(false)}
                label="なし"
              />
            </div>
          </div>

          {/* 睡眠 */}
          <div style={{ marginBottom: "24px" }}>
            <SectionTitle icon="😴" title="睡眠時間" />
            <div style={{ ...cardStyle, textAlign: "center" }}>
              <p
                style={{
                  fontSize: "40px",
                  fontWeight: "800",
                  color: colors.primary,
                  margin: "0 0 16px",
                }}
              >
                {sleep}
                <span style={{ fontSize: "18px", fontWeight: "600" }}>
                  時間
                </span>
              </p>
              <input
                type="range"
                min="0"
                max="12"
                value={sleep}
                onChange={(e) => setSleep(Number(e.target.value))}
                style={{
                  width: "100%",
                  accentColor: colors.primary,
                  cursor: "pointer",
                }}
              />
            </div>
          </div>

          {/* 天気 */}
          <div style={{ marginBottom: "24px" }}>
            <SectionTitle icon="🌤️" title="天気" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {allWeathers.map((item) => (
                <IconButton
                  key={item.id}
                  item={item}
                  selected={weather === item.id}
                  onClick={() => setWeather(item.id)}
                  selectedColor={colors.secondary}
                />
              ))}
              <AddButton category="weather" label="天気" />
            </div>
            {editingCategory === "weather" && (
              <AddItemForm category="weather" label="天気" />
            )}
          </div>

          {/* 気温 */}
          <div style={{ marginBottom: "24px" }}>
            <SectionTitle icon="🌡️" title="気温" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {allTemperatures.map((item) => (
                <IconButton
                  key={item.id}
                  item={item}
                  selected={temperature === item.id}
                  onClick={() => setTemperature(item.id)}
                  selectedColor={colors.accent}
                />
              ))}
              <AddButton category="temperature" label="気温" />
            </div>
            {editingCategory === "temperature" && (
              <AddItemForm category="temperature" label="気温" />
            )}
          </div>

          {/* 食事 */}
          <div style={{ marginBottom: "16px" }}>
            <SectionTitle icon="🍽️" title="今日食べたもの" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
              {allFoods.map((food) => (
                <IconButton
                  key={food.id}
                  item={food}
                  selected={foods.includes(food.id)}
                  onClick={() => toggleFood(food.id)}
                  selectedColor={colors.primary}
                />
              ))}
              <AddButton category="food" label="食べ物" />
            </div>
            {editingCategory === "food" && (
              <AddItemForm category="food" label="食べ物" />
            )}
          </div>
        </div>

        {/* 保存ボタン */}
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <button
            onClick={saveRecord}
            style={{
              ...buttonBaseStyle,
              padding: "18px",
              borderRadius: "16px",
              fontSize: "18px",
              background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`,
              color: colors.white,
              boxShadow: `0 8px 25px ${colors.primary}40`,
            }}
          >
            {isEditing ? "更新する" : "保存する"}
          </button>
          {isEditing && (
            <button
              onClick={deleteRecord}
              style={{
                ...buttonBaseStyle,
                padding: "14px",
                borderRadius: "12px",
                background: "transparent",
                border: `2px solid ${colors.symptomYes}`,
                color: colors.symptomYes,
              }}
            >
              この記録を削除
            </button>
          )}
        </div>
      </div>
    );
  };

  /* 結果画面 */
  const ResultScreen = () => {
    const recordCount = Object.keys(savedRecords).length;

    const TriggerCard = ({ icon, title, message, color }) => (
      <div
        style={{
          ...cardStyle,
          marginBottom: "16px",
          borderLeft: `5px solid ${color}`,
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "12px",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "14px",
              background: `${color}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: "18px",
              fontWeight: "700",
              color: colors.textPrimary,
            }}
          >
            {title}
          </span>
        </div>
        <p
          style={{
            fontSize: "15px",
            color: colors.textSecondary,
            lineHeight: 1.6,
            margin: 0,
            paddingLeft: "60px",
          }}
        >
          {message}
        </p>
      </div>
    );

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => navigateTo("home")}
            style={{
              ...buttonBaseStyle,
              background: colors.bgCard,
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              fontSize: "20px",
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            ←
          </button>
          <h2
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "700",
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            原因の分析
          </h2>
          <div style={{ width: "44px" }} />
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {recordCount < 7 ? (
            <div
              style={{
                ...cardStyle,
                textAlign: "center",
                padding: "48px 24px",
              }}
            >
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: `linear-gradient(135deg, ${colors.accent} 0%, ${colors.accentLight} 100%)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "36px",
                  margin: "0 auto 20px",
                }}
              >
                📊
              </div>
              <h3
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  color: colors.textPrimary,
                  marginBottom: "12px",
                }}
              >
                もう少し記録がたまると
                <br />
                原因がわかります
              </h3>
              <p
                style={{
                  fontSize: "15px",
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                現在 <strong>{recordCount}日分</strong>の記録
                <br />
                あと <strong>{7 - recordCount}日分</strong>で分析できます
              </p>
            </div>
          ) : (
            <>
              <div
                style={{
                  ...cardStyle,
                  background: `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`,
                  marginBottom: "20px",
                  color: colors.white,
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "14px",
                    opacity: 0.9,
                    marginBottom: "4px",
                  }}
                >
                  分析結果
                </p>
                <p style={{ fontSize: "24px", fontWeight: "700", margin: 0 }}>
                  3つのトリガーを発見
                </p>
              </div>

              <TriggerCard
                icon="😴"
                title="睡眠不足"
                message="6時間未満の日は頭痛になりやすい傾向があります"
                color={colors.symptomYes}
              />
              <TriggerCard
                icon="🥶"
                title="寒い日"
                message="寒い日は頭痛になりやすい傾向があります"
                color={colors.symptomYes}
              />
              <TriggerCard
                icon="🥛"
                title="乳製品"
                message="乳製品を食べた日はアレルギーが出やすい傾向があります"
                color={colors.secondary}
              />
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

    const CustomItemBadge = ({ item, category }) => (
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          background: colors.bgSecondary,
          padding: "8px 12px",
          borderRadius: "10px",
          fontSize: "14px",
        }}
      >
        <span>{item.icon}</span>
        <span style={{ color: colors.textPrimary }}>{item.name}</span>
        <button
          onClick={() => removeCustomItem(category, item.id)}
          style={{
            ...buttonBaseStyle,
            background: "none",
            padding: "0 4px",
            fontSize: "16px",
            color: colors.symptomYes,
          }}
        >
          ×
        </button>
      </div>
    );

    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          opacity: fadeIn ? 1 : 0,
          transition: "opacity 0.15s ease",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <button
            onClick={() => navigateTo("home")}
            style={{
              ...buttonBaseStyle,
              background: colors.bgCard,
              width: "44px",
              height: "44px",
              borderRadius: "14px",
              fontSize: "20px",
              boxShadow: `0 2px 8px ${colors.shadow}`,
            }}
          >
            ←
          </button>
          <h2
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: "20px",
              fontWeight: "700",
              color: colors.textPrimary,
              margin: 0,
            }}
          >
            設定
          </h2>
          <div style={{ width: "44px" }} />
        </div>

        <div style={{ flex: 1, overflow: "auto" }}>
          {/* 通知設定 */}
          <div style={{ ...cardStyle, marginBottom: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "700",
                    color: colors.textPrimary,
                    margin: "0 0 4px",
                  }}
                >
                  🔔 リマインダー
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    margin: 0,
                  }}
                >
                  記録を忘れないように通知
                </p>
              </div>
              <button
                onClick={() => setNotifyEnabled(!notifyEnabled)}
                style={{
                  ...buttonBaseStyle,
                  width: "56px",
                  height: "32px",
                  borderRadius: "16px",
                  background: notifyEnabled
                    ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`
                    : "#ddd",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: "26px",
                    height: "26px",
                    borderRadius: "13px",
                    background: colors.white,
                    position: "absolute",
                    top: "3px",
                    left: notifyEnabled ? "27px" : "3px",
                    transition: "left 0.2s ease",
                    boxShadow: `0 2px 4px ${colors.shadow}`,
                  }}
                />
              </button>
            </div>

            {notifyEnabled && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  background: colors.bgSecondary,
                  borderRadius: "14px",
                }}
              >
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    marginBottom: "10px",
                  }}
                >
                  通知する時間
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  {["20:00", "21:00", "22:00"].map((time) => (
                    <button
                      key={time}
                      onClick={() => setNotifyTime(time)}
                      style={{
                        ...buttonBaseStyle,
                        flex: 1,
                        padding: "12px",
                        borderRadius: "10px",
                        fontSize: "16px",
                        background:
                          notifyTime === time
                            ? `linear-gradient(135deg, ${colors.secondary} 0%, ${colors.secondaryDark} 100%)`
                            : colors.bgCard,
                        color:
                          notifyTime === time
                            ? colors.white
                            : colors.textPrimary,
                        boxShadow:
                          notifyTime === time
                            ? `0 4px 12px ${colors.secondary}40`
                            : "none",
                      }}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* カスタム項目 */}
          <div style={{ ...cardStyle, marginBottom: "16px" }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: colors.textPrimary,
                marginBottom: "16px",
              }}
            >
              📝 追加した項目
            </p>

            {customWeathers.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    marginBottom: "8px",
                  }}
                >
                  天気
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {customWeathers.map((item) => (
                    <CustomItemBadge
                      key={item.id}
                      item={item}
                      category="weather"
                    />
                  ))}
                </div>
              </div>
            )}

            {customTemperatures.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    marginBottom: "8px",
                  }}
                >
                  気温
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {customTemperatures.map((item) => (
                    <CustomItemBadge
                      key={item.id}
                      item={item}
                      category="temperature"
                    />
                  ))}
                </div>
              </div>
            )}

            {customFoods.length > 0 && (
              <div style={{ marginBottom: "14px" }}>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textSecondary,
                    marginBottom: "8px",
                  }}
                >
                  食べ物
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {customFoods.map((item) => (
                    <CustomItemBadge
                      key={item.id}
                      item={item}
                      category="food"
                    />
                  ))}
                </div>
              </div>
            )}

            {customWeathers.length === 0 &&
              customFoods.length === 0 &&
              customTemperatures.length === 0 && (
                <p style={{ fontSize: "14px", color: colors.textLight }}>
                  記録画面の「＋」ボタンから追加できます
                </p>
              )}
          </div>

          {/* データ管理 */}
          <div style={{ ...cardStyle }}>
            <p
              style={{
                fontSize: "16px",
                fontWeight: "700",
                color: colors.textPrimary,
                marginBottom: "4px",
              }}
            >
              📊 記録データ
            </p>
            <p
              style={{
                fontSize: "13px",
                color: colors.textSecondary,
                marginBottom: "16px",
              }}
            >
              現在 {Object.keys(savedRecords).length}日分の記録があります
            </p>
            <button
              onClick={() => setSavedRecords({})}
              style={{
                ...buttonBaseStyle,
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                background: "transparent",
                border: `2px solid ${colors.symptomYes}`,
                color: colors.symptomYes,
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
        background: "linear-gradient(160deg, #2D3142 0%, #1a1a2e 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
            marginTop: "24px",
          }}
        >
          {["home", "calendar", "record", "result", "settings"].map((s) => (
            <div
              key={s}
              onClick={() => navigateTo(s)}
              style={{
                width: currentScreen === s ? "28px" : "10px",
                height: "10px",
                borderRadius: "5px",
                background:
                  currentScreen === s
                    ? `linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%)`
                    : "rgba(255,255,255,0.25)",
                cursor: "pointer",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TriggerSearchApp;
