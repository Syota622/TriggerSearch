import React, { useState } from "react";

const TriggerSearchSimple = () => {
  const [currentScreen, setCurrentScreen] = useState("home");
  const [headache, setHeadache] = useState(null);
  const [allergy, setAllergy] = useState(null);
  const [sleep, setSleep] = useState(7);
  const [weather, setWeather] = useState(null);

  /* カラーパレット */
  const colors = {
    primary: "#FF8C66",
    secondary: "#4ECDC4",
    yes: "#FF6B6B",
    yesBg: "#FFF0F0",
    no: "#4A90D9",
    noBg: "#F0F6FF",
    text: "#2D3748",
    bg: "#FFFBF7",
    white: "#FFFFFF",
  };

  const phoneFrame = {
    width: "375px",
    height: "700px",
    backgroundColor: colors.bg,
    borderRadius: "40px",
    boxShadow: "0 25px 80px rgba(0,0,0,0.15), 0 0 0 12px #1a1a1a",
    overflow: "hidden",
  };

  /* ホーム画面 */
  const HomeScreen = () => (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "80px 32px 60px",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
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
          gap: "28px",
        }}
      >
        <button
          onClick={() => setCurrentScreen("record")}
          style={{
            background: colors.primary,
            border: "none",
            borderRadius: "24px",
            padding: "40px",
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
            padding: "40px",
            color: "white",
            fontSize: "26px",
            fontWeight: "700",
            cursor: "pointer",
            boxShadow: `0 12px 40px ${colors.secondary}50`,
          }}
        >
          🔍 原因を見る
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
          marginBottom: "16px",
        }}
      >
        ←
      </button>

      <div style={{ flex: 1, overflow: "auto" }}>
        {/* 頭痛 */}
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            🤕 頭痛は？
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              onClick={() => setHeadache(true)}
              style={{
                flex: 1,
                padding: "28px",
                fontSize: "22px",
                fontWeight: "700",
                border: "none",
                borderRadius: "20px",
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
                padding: "28px",
                fontSize: "22px",
                fontWeight: "700",
                border: "none",
                borderRadius: "20px",
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
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            🤧 アレルギーは？
          </div>
          <div style={{ display: "flex", gap: "16px" }}>
            <button
              onClick={() => setAllergy(true)}
              style={{
                flex: 1,
                padding: "28px",
                fontSize: "22px",
                fontWeight: "700",
                border: "none",
                borderRadius: "20px",
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
                padding: "28px",
                fontSize: "22px",
                fontWeight: "700",
                border: "none",
                borderRadius: "20px",
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
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            😴 睡眠時間
          </div>
          <div
            style={{
              background: colors.white,
              borderRadius: "20px",
              padding: "24px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontSize: "52px",
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
                marginTop: "20px",
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
              fontSize: "22px",
              fontWeight: "700",
              color: colors.text,
              marginBottom: "16px",
              textAlign: "center",
            }}
          >
            天気
          </div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["☀️", "☁️", "🌧️", "❄️"].map((icon, i) => (
              <button
                key={i}
                onClick={() => setWeather(i)}
                style={{
                  flex: 1,
                  padding: "20px 0",
                  fontSize: "36px",
                  border: "none",
                  borderRadius: "16px",
                  cursor: "pointer",
                  background: weather === i ? colors.secondary : colors.white,
                  boxShadow:
                    weather === i ? `0 6px 20px ${colors.secondary}50` : "none",
                }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => setCurrentScreen("home")}
        style={{
          background: colors.primary,
          border: "none",
          borderRadius: "20px",
          padding: "24px",
          color: "white",
          fontSize: "24px",
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
          🔍 見つかった原因
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto" }}>
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
      </div>
    </div>
  );

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
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: "20px",
          }}
        >
          {["home", "record", "result"].map((s) => (
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
