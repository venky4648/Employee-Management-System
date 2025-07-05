// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Chatbot = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your leave application assistant. I'll help you apply for leave. What type of leave would you like to apply for? (Sick Leave, Casual Leave, Earned Leave, Maternity Leave, Paternity Leave, or Other)",
      sender: "bot",
    },
  ]);
  const [currentStep, setCurrentStep] = useState("leaveType");
  const [leaveData, setLeaveData] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [inputValue, setInputValue] = useState("");

  const leaveTypes = [
    "Sick Leave",
    "Casual Leave",
    "Earned Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Other",
  ];

  const validateDate = (dateString) => {
    // Check if the date string matches YYYY-MM-DD format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(dateString)) {
      return false;
    }

    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(date.getTime())) {
      return false;
    }

    if (date < today) {
      return false;
    }

    return true;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);
    const userInput = inputValue.trim();
    setInputValue("");

    // Process based on current step
    switch (currentStep) {
      case "leaveType": {
        const matchedLeaveType = leaveTypes.find(
          (type) => type.toLowerCase() === userInput.toLowerCase()
        );
        if (matchedLeaveType) {
          setLeaveData((prev) => ({ ...prev, leaveType: matchedLeaveType }));
          setCurrentStep("startDate");
          const botMessage = {
            id: messages.length + 2,
            text: `Great! You selected ${matchedLeaveType}. Please enter the start date (YYYY-MM-DD format):`,
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          const botMessage = {
            id: messages.length + 2,
            text: "Please select a valid leave type: Sick Leave, Casual Leave, Earned Leave, Maternity Leave, Paternity Leave, or Other",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        }
        break;
      }

      case "startDate":
        if (validateDate(userInput)) {
          setLeaveData((prev) => ({
            ...prev,
            startDate: formatDate(userInput),
          }));
          setCurrentStep("endDate");
          const botMessage = {
            id: messages.length + 2,
            text: "Perfect! Now please enter the end date (YYYY-MM-DD format):",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          const botMessage = {
            id: messages.length + 2,
            text: "Please enter a valid future date in YYYY-MM-DD format (e.g., 2024-01-15). Try again:",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
          // Stay in the same step to allow retry
        }
        break;

      case "endDate":
        if (validateDate(userInput)) {
          const startDate = new Date(leaveData.startDate);
          const endDate = new Date(formatDate(userInput));

          if (endDate < startDate) {
            const botMessage = {
              id: messages.length + 2,
              text: "End date cannot be before start date. Please enter a valid end date. Try again:",
              sender: "bot",
            };
            setMessages((prev) => [...prev, botMessage]);
            // Stay in the same step to allow retry
            return;
          }

          setLeaveData((prev) => ({ ...prev, endDate: formatDate(userInput) }));
          setCurrentStep("reason");
          const botMessage = {
            id: messages.length + 2,
            text: "Excellent! Now please provide a reason for your leave:",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          const botMessage = {
            id: messages.length + 2,
            text: "Please enter a valid future date in YYYY-MM-DD format (e.g., 2024-01-15). Try again:",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
          // Stay in the same step to allow retry
        }
        break;

      case "reason": {
        setLeaveData((prev) => ({ ...prev, reason: userInput }));
        setCurrentStep("confirm");
        const botMessage = {
          id: messages.length + 2,
          text: `Please confirm your leave application:\n\nLeave Type: ${leaveData.leaveType}\nStart Date: ${leaveData.startDate}\nEnd Date: ${leaveData.endDate}\nReason: ${userInput}\n\nType 'yes' to confirm or 'no' to start over.`,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botMessage]);
        break;
      }

      case "confirm": {
        if (userInput.toLowerCase() === "yes") {
          try {
            const requestBody = {
              userId: user._id,
              leaveType: leaveData.leaveType,
              startDate: leaveData.startDate,
              endDate: leaveData.endDate,
              reason: leaveData.reason,
            };

            const response = await axios.post(
              "http://localhost:3000/api/leave/add",
              requestBody,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            console.log(response.data);
            alert(response.data.message);

            if (response.data.success) {
              const botMessage = {
                id: messages.length + 2,
                text: "Great! Your leave application has been submitted successfully. You can check the status in your leave list.",
                sender: "bot",
              };
              setMessages((prev) => [...prev, botMessage]);

              // Navigate to leave list after successful submission
              setTimeout(() => {
                navigate(`/employee-dashboard/leave/${user._id}`);
              }, 2000);

              // Reset for new application
              setTimeout(() => {
                setCurrentStep("leaveType");
                setLeaveData({
                  leaveType: "",
                  startDate: "",
                  endDate: "",
                  reason: "",
                });
                const newBotMessage = {
                  id: messages.length + 3,
                  text: "Would you like to apply for another leave? What type of leave would you like to apply for? (Sick Leave, Casual Leave, Earned Leave, Maternity Leave, Paternity Leave, or Other)",
                  sender: "bot",
                };
                setMessages((prev) => [...prev, newBotMessage]);
              }, 3000);
            } else {
              const botMessage = {
                id: messages.length + 2,
                text: "Sorry, there was an error submitting your leave application. Please try again.",
                sender: "bot",
              };
              setMessages((prev) => [...prev, botMessage]);
            }
          } catch (error) {
            console.error("Error submitting leave:", error);
            const errorMessage =
              error.response?.data?.message ||
              "Sorry, there was an error submitting your leave application. Please try again.";
            const botMessage = {
              id: messages.length + 2,
              text: errorMessage,
              sender: "bot",
            };
            setMessages((prev) => [...prev, botMessage]);
          }
        } else if (userInput.toLowerCase() === "no") {
          setCurrentStep("leaveType");
          setLeaveData({
            leaveType: "",
            startDate: "",
            endDate: "",
            reason: "",
          });
          const botMessage = {
            id: messages.length + 2,
            text: "No problem! Let's start over. What type of leave would you like to apply for? (Sick Leave, Casual Leave, Earned Leave, Maternity Leave, Paternity Leave, or Other)",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        } else {
          const botMessage = {
            id: messages.length + 2,
            text: "Please type 'yes' to confirm or 'no' to start over.",
            sender: "bot",
          };
          setMessages((prev) => [...prev, botMessage]);
        }
        break;
      }

      default:
        break;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div
      style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h1
          style={{
            color: "#007BFF",
            fontSize: "2rem",
            marginBottom: "10px",
          }}
        >
          Leave Application Chatbot
        </h1>
        <p style={{ color: "#666" }}>
          Interactive assistant to help you apply for leave
        </p>
      </div>

      {/* Main layout - all sections side by side */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "flex-start",
        }}
      >
        {/* Chatbot Container */}
        <div
          style={{
            flex: "2",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "400px",
              border: "2px solid #007BFF",
              borderRadius: "10px",
              padding: "20px",
              overflowY: "auto",
              backgroundColor: "#f8f9fa",
              marginBottom: "20px",
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  marginBottom: "15px",
                  textAlign: message.sender === "user" ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "18px",
                    backgroundColor:
                      message.sender === "user" ? "#007BFF" : "#e9ecef",
                    color: message.sender === "user" ? "white" : "#333",
                    wordWrap: "break-word",
                    whiteSpace: "pre-line",
                  }}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              style={{
                flex: 1,
                padding: "12px",
                border: "2px solid #007BFF",
                borderRadius: "25px",
                fontSize: "16px",
                outline: "none",
              }}
            />
            <button
              onClick={handleSendMessage}
              style={{
                padding: "12px 24px",
                backgroundColor: "#007BFF",
                color: "white",
                border: "none",
                borderRadius: "25px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              Send
            </button>
          </div>
        </div>

        {/* Progress Boxes Container */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Current Progress Box */}
          <div
            style={{
              flex: "1",
              padding: "15px",
              backgroundColor: "#e7f3ff",
              borderRadius: "8px",
              border: "1px solid #007BFF",
              minHeight: "200px",
            }}
          >
            <h3 style={{ color: "#007BFF", marginBottom: "10px" }}>
              Current Progress:
            </h3>
            <div style={{ fontSize: "14px", color: "#333" }}>
              <p>
                <strong>Step:</strong>{" "}
                {currentStep === "leaveType"
                  ? "Selecting Leave Type"
                  : currentStep === "startDate"
                  ? "Entering Start Date"
                  : currentStep === "endDate"
                  ? "Entering End Date"
                  : currentStep === "reason"
                  ? "Providing Reason"
                  : currentStep === "confirm"
                  ? "Confirming Application"
                  : "Complete"}
              </p>
              {leaveData.leaveType && (
                <p>
                  <strong>Leave Type:</strong> {leaveData.leaveType}
                </p>
              )}
              {leaveData.startDate && (
                <p>
                  <strong>Start Date:</strong> {leaveData.startDate}
                </p>
              )}
              {leaveData.endDate && (
                <p>
                  <strong>End Date:</strong> {leaveData.endDate}
                </p>
              )}
              {leaveData.reason && (
                <p>
                  <strong>Reason:</strong> {leaveData.reason}
                </p>
              )}
            </div>
          </div>

          {/* Progress Steps Box */}
          <div
            style={{
              flex: "1",
              padding: "15px",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #dee2e6",
              minHeight: "200px",
            }}
          >
            <h3
              style={{
                color: "#495057",
                marginBottom: "15px",
                textAlign: "center",
              }}
            >
              Progress Steps
            </h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                { key: "leaveType", label: "Leave Type", icon: "📝" },
                { key: "startDate", label: "Start Date", icon: "📅" },
                { key: "endDate", label: "End Date", icon: "📅" },
                { key: "reason", label: "Reason", icon: "💬" },
                { key: "confirm", label: "Confirm", icon: "✅" },
              ].map((step) => {
                const isCompleted =
                  (step.key === "leaveType" && leaveData.leaveType) ||
                  (step.key === "startDate" && leaveData.startDate) ||
                  (step.key === "endDate" && leaveData.endDate) ||
                  (step.key === "reason" && leaveData.reason) ||
                  (step.key === "confirm" && currentStep === "confirm");

                const isCurrent = currentStep === step.key;

                return (
                  <div
                    key={step.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "10px",
                      borderRadius: "8px",
                      backgroundColor: isCompleted
                        ? "#d4edda"
                        : isCurrent
                        ? "#fff3cd"
                        : "#f8f9fa",
                      border: isCompleted
                        ? "2px solid #28a745"
                        : isCurrent
                        ? "2px solid #ffc107"
                        : "2px solid #dee2e6",
                    }}
                  >
                    <div style={{ fontSize: "20px", marginRight: "10px" }}>
                      {step.icon}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        fontWeight: "bold",
                        color: isCompleted
                          ? "#155724"
                          : isCurrent
                          ? "#856404"
                          : "#6c757d",
                        flex: "1",
                      }}
                    >
                      {step.label}
                    </div>
                    {isCompleted && (
                      <div
                        style={{
                          fontSize: "16px",
                          color: "#28a745",
                          fontWeight: "bold",
                        }}
                      >
                        ✓
                      </div>
                    )}
                    {isCurrent && !isCompleted && (
                      <div
                        style={{
                          fontSize: "16px",
                          color: "#ffc107",
                          fontWeight: "bold",
                        }}
                      >
                        →
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
