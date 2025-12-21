import React, { useState } from "react";

const TriggerSearchSimple = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [headache, setHeadache] = useState(null);
  const [allergy, setAllergy] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [weather, setWeather] = useState(null);
  const [foods, setFoods] = useState([]);
  const [dataCount, setDataCount] = useState(5); // デモ用：記録日数

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

  /* 食品リスト */
  const foodList = [
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

  const toggleFood = (id) => {
    if (foods.includes(id)) {
      setFoods(foods.filter((f) => f !== id));
    } else {
      setFoods([...foods, id]);
    }
  };

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
          gap: "24px",
        }}
      >
        <button
          onClick={() => setCurrentScreen("record")}
          style={{
            background: colors.primary,
            border: "none",
            borderRadius: "24px",
            padding: "36px",
            color: "white",
            fontSize: "26px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: `0 12px 40px ${colors.primary}50`,
          }}
        >
          📝 記録する
        </button>

        <button
          onClick={() => setCurrentScreen("result")}
          style={{
            background: colors.secondary,
            border: "none",
            borderRadius: "24px",
            padding: "36px",
            color: "white",
            fontSize: "26px",
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
            padding: "20px",
            color: colors.textLight,
            fontSize: "18px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          ⚙️ 設定
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

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* 頭痛 */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "12px",
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
                padding: "24px",
                fontSize: "20px",
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
                padding: "24px",
                fontSize: "20px",
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
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "12px",
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
                padding: "24px",
                fontSize: "20px",
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
                padding: "24px",
                fontSize: "20px",
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
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            😴 睡眠時間
          </div>
          <div
            style={{
              background: colors.white,
              borderRadius: "16px",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "44px",
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
              onChange={(e) => setSleep(e.target.value)}
              style={{
                width: "100%",
                height: "12px",
                marginTop: "16px",
                accentColor: colors.primary,
                cursor: "pointer",
              }}
            />
          </div>
        </div>

        {/* 天気 */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            天気
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            {["☀️", "☁️", "🌧️", "❄️"].map((icon, i) => (
              <button
                key={i}
                onClick={() => setWeather(i)}
                style={{
                  flex: 1,
                  padding: "16px 0",
                  fontSize: "32px",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  background: weather === i ? colors.secondary : colors.white,
                  boxShadow:
                    weather === i ? `0 4px 15px ${colors.secondary}50` : "none",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* 食事（新規追加） */}
        <div style={{ marginBottom: "20px" }}>
          <div
            style={{
              fontSize: "20px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "12px",
              textAlign: "center",
            }}
          >
            🍽️ 今日食べたもの
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
            }}
          >
            {foodList.map((food) => (
              <button
                key={food.id}
                onClick={() => toggleFood(food.id)}
                style={{
                  padding: "14px 8px",
                  fontSize: "28px",
                  border: "none",
                  borderRadius: "14px",
                  cursor: "pointer",
                  background: foods.includes(food.id)
                    ? colors.primary
                    : colors.white,
                  boxShadow: foods.includes(food.id)
                    ? `0 4px 15px ${colors.primary}40`
                    : "none",
                  transition: "all 0.2s",
                }}
                title={food.name}
              >
                {food.icon}
              </button>
            ))}
          </div>
          <div
            style={{
              fontSize: "12px",
              color: colors.textLight,
              textAlign: "center",
              marginTop: "8px",
            }}
          >
            タップで選択
          </div>
        </div>
      </div>

      <button
        onClick={() => {
          setDataCount(dataCount + 1);
          setCurrentScreen("home");
        }}
        style={{
          background: colors.primary,
          border: "none",
          borderRadius: "20px",
          padding: "22px",
          color: "white",
          fontSize: "22px",
          fontWeight: "700",
          cursor: "pointer",
          boxShadow: `0 10px 40px ${colors.primary}50`,
        }}
      >
        保存する
      </button>
    </div>
  );

  /* 結果画面 */
  const ResultScreen = () => (
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
        {/* データ不足時のメッセージ */}
        {dataCount < 7 ? (
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
              現在 {dataCount}日分の記録
              <br />
              あと {7 - dataCount}日分で分析できます
            </div>
          </div>
        ) : (
          <>
            {/* 結果1 */}
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

            {/* 結果2 */}
            <div
              style={{
                background: colors.white,
                borderRadius: "20px",
                padding: "24px",
                marginBottom: "16px",
                borderLeft: `6px solid ${colors.yes}`,
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🌧️</div>
              <div
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  color: colors.text,
                  marginBottom: "12px",
                }}
              >
                雨の日
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
                雨の日は
                <br />
                <strong>頭痛</strong>になりやすい
              </div>
            </div>

            {/* 結果3 */}
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

  /* 設定画面（通知設定） */
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
            marginBottom: "32px",
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

        <div style={{ flex: 1 }}>
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
                <div
                  style={{
                    fontSize: "14px",
                    color: colors.textLight,
                    marginTop: "12px",
                    textAlign: "center",
                  }}
                >
                  「今日の調子はどうでしたか？」と
                  <br />
                  お知らせします
                </div>
              </div>
            )}
          </div>

          {/* データ削除 */}
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
              現在 {dataCount}日分の記録があります
            </div>
            <button
              onClick={() => setDataCount(0)}
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
          {["home", "record", "result", "settings"].map((s) => (
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
