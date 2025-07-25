import React, { useState, useEffect, useCallback } from 'react';
import ScheduleTable from './components/ScheduleTable';
import ScheduleFilter from './components/ScheduleFilter';
import StatsDashboard from './components/StatsDashboard';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import CurrentDateIndicator from './components/CurrentDateIndicator';
import Footer from './components/Footer';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { isAuthenticated, logout, getUserProfile } from './api/auth';
import axios from 'axios';
import './App.css';

const App = () => {
  // Auth states
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  
  // Existing states
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ month: '', skill: '', status: '' });
  const [filteredSchedule, setFilteredSchedule] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20);

  // Date states
  const [startDate, setStartDate] = useState(() => {
    const saved = localStorage.getItem('scheduleStartDate');
    return saved ? new Date(saved) : new Date();
  });

  // Check authentication status on load
  useEffect(() => {
    const checkAuth = async () => {
      if (isAuthenticated()) {
        setIsLoggedIn(true);
        setUserData(JSON.parse(localStorage.getItem('ielts_auth')));
        
        try {
          // Validate token by fetching user profile
          const profile = await getUserProfile();
          setUserData(prev => ({ ...prev, ...profile }));
        } catch (error) {
          console.log('Token invalid or expired');
          logout();
          setIsLoggedIn(false);
          setUserData(null);
        }
      }
    };
    
    checkAuth();
  }, []);

  // Login handler
  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  };

  // Logout handler
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setUserData(null);
  };

  // Register success handler
  const handleRegisterSuccess = () => {
    alert('Đăng ký thành công! Vui lòng đăng nhập.');
    setShowRegister(false);
  };

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    if (newDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  };

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      const isDarkMode = JSON.parse(savedDarkMode);
      setDarkMode(isDarkMode);
      if (isDarkMode) {
        document.body.classList.add('dark-mode');
      }
    }
  }, []);

  // Function to generate a schedule with specific Reading, Speaking, Listening, and Writing tests
  const generateSchedule = (customStartDate) => {
    const newSchedule = [];
    const skills = ['Reading', 'Listening', 'Speaking', 'Writing'];
    const times = ['6:30 AM', '10:00 PM'];
    
    // Sử dụng customStartDate nếu được cung cấp, nếu không dùng startDate từ state
    const scheduleStartDate = customStartDate || startDate;
    
    let skillIndex = 0;
    let readingTestIndex = 0;
    let speakingTestIndex = 0;
    let listeningTestIndex = 0;
    let writingTestIndex = 0;
    
    for (let i = 0; i < 200; i++) {
      const lessonDate = new Date(scheduleStartDate);
      lessonDate.setDate(scheduleStartDate.getDate() + Math.floor(i/2));
      
      const formattedDate = lessonDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      
      const skill = skills[skillIndex % 4];
      const time = times[i % 2];
      
      let name, link;
      
      if (skill === 'Reading' && readingTestIndex < 40) {
        // Calculate Cambridge book number (10-19) and test number (1-4)
        const camNumber = Math.floor(readingTestIndex / 4) + 10;
        const testNumber = (readingTestIndex % 4) + 1;
        // Format test number with leading zero
        const formattedTestNumber = testNumber.toString().padStart(2, '0');
        
        name = `Cam ${camNumber} Test ${testNumber}`;
        link = `https://ieltstrainingonline.com/practice-cam-${camNumber}-reading-test-${formattedTestNumber}-with-answer/`;
        
        readingTestIndex++; // Increment only for Reading tests
      } 
      else if (skill === 'Speaking' && speakingTestIndex < 24) {
        // Format test number with leading zero (01-24)
        const formattedTestNumber = (speakingTestIndex + 1).toString().padStart(2, '0');
        
        name = `Speaking Practice Test ${formattedTestNumber}`;
        link = `https://ieltstrainingonline.com/ielts-speaking-practice-test-${formattedTestNumber}/`;
        
        speakingTestIndex++; // Increment only for Speaking tests
      }
      else if (skill === 'Listening' && listeningTestIndex < 50) {
        // Format test number with leading zero (01-50)
        const formattedTestNumber = (listeningTestIndex + 1).toString().padStart(2, '0');
        
        name = `Listening Practice Test ${formattedTestNumber}`;
        link = `https://ieltstrainingonline.com/ielts-listening-practice-test-${formattedTestNumber}/`;
        
        listeningTestIndex++; // Increment only for Listening tests
      }
      else if (skill === 'Writing' && writingTestIndex < 50) {
        // Format test number with leading zero (01-50)
        const formattedTestNumber = (writingTestIndex + 1).toString().padStart(2, '0');
        
        name = `Writing Practice Test ${formattedTestNumber}`;
        link = `https://ieltstrainingonline.com/ielts-writing-practice-test-${formattedTestNumber}/`;
        
        writingTestIndex++; // Increment only for Writing tests
      }
      else {
        // For any remaining slots (which shouldn't happen with our current setup)
        name = `${skill} Practice ${Math.floor(i/4) + 1}`;
        link = `https://ieltstrainingonline.com/${skill.toLowerCase()}-practice`;
      }
      
      newSchedule.push({
        date: formattedDate,
        time: time,
        skill: skill,
        status: 'not started',
        name: name,
        link: link,
      });
      
      skillIndex++;
    }
    
    return newSchedule;
  };

  // Function to check for overdue items
  const checkForOverdueItems = (scheduleData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part for date comparison
    
    return scheduleData.map(item => {
      // Parse the date from the formatted string
      const itemDate = new Date(item.date);
      
      // If the item date is before today and status is not completed, mark as overdue
      if (itemDate < today && item.status !== 'completed') {
        return {...item, status: 'overdue'};
      }
      return item;
    });
  };

  // Hàm tự động cập nhật trạng thái bài học hôm nay
  const updateTodayLessons = (scheduleData) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00
    
    return scheduleData.map(item => {
      try {
        const itemDate = new Date(item.date);
        itemDate.setHours(0, 0, 0, 0); // Đặt thời gian về 00:00:00 để so sánh chỉ ngày
        
        // Nếu là bài học của ngày hôm nay và trạng thái là "not started"
        if (itemDate.getTime() === today.getTime() && item.status === 'not started') {
          return { ...item, status: 'in progress' };
        }
      } catch (e) {
        console.error('Error parsing date:', e);
      }
      return item;
    });
  };

  // Move this function outside of useEffect
  // Place this before your useEffect
  const loadFromApiOrGenerate = useCallback(() => {
    // Thử tải dữ liệu từ API
    axios.get('/api/getSchedule')
      .then(response => {
        // Xử lý dữ liệu từ API
        let updatedSchedule = response.data;
        // Kiểm tra các bài quá hạn
        updatedSchedule = checkForOverdueItems(updatedSchedule);
        // Tự động cập nhật trạng thái bài học hôm nay
        updatedSchedule = updateTodayLessons(updatedSchedule);
        
        setSchedule(updatedSchedule);
        setLoading(false);
        // Save the data to localStorage
        localStorage.setItem('ieltsSchedule', JSON.stringify(updatedSchedule));
      })
      .catch(err => {
        console.log('No backend API found or error fetching data. Generating local schedule.');
        setError(err.message);
        
        // Lấy ngày bắt đầu đã lưu hoặc dùng ngày hiện tại nếu chưa có
        const savedStartDate = localStorage.getItem('scheduleStartDate');
        const useStartDate = savedStartDate ? new Date(savedStartDate) : new Date();
        
        // Lưu ngày bắt đầu nếu chưa có
        if (!savedStartDate) {
          localStorage.setItem('scheduleStartDate', useStartDate.toISOString());
          setStartDate(useStartDate);
        }
        
        // Tạo lịch trình từ ngày bắt đầu đã lưu
        let generatedSchedule = generateSchedule(useStartDate);
        // Kiểm tra các bài quá hạn
        generatedSchedule = checkForOverdueItems(generatedSchedule);
        // Tự động cập nhật trạng thái bài học hôm nay
        generatedSchedule = updateTodayLessons(generatedSchedule);
        
        setSchedule(generatedSchedule);
        setLoading(false);
        localStorage.setItem('ieltsSchedule', JSON.stringify(generatedSchedule));
      });
  }, [generateSchedule]); // Cập nhật dependency

  useEffect(() => {
    setLoading(true);
    
    // First try to load from localStorage
    const savedSchedule = localStorage.getItem('ieltsSchedule');
    
    if (savedSchedule) {
      try {
        let parsedSchedule = JSON.parse(savedSchedule);
        
        // Kiểm tra các bài quá hạn
        parsedSchedule = checkForOverdueItems(parsedSchedule);
        
        // Tự động cập nhật trạng thái bài học hôm nay thành "in progress"
        parsedSchedule = updateTodayLessons(parsedSchedule);
        
        setSchedule(parsedSchedule);
        // Lưu lịch đã cập nhật vào localStorage
        localStorage.setItem('ieltsSchedule', JSON.stringify(parsedSchedule));
        setLoading(false);
        console.log('Schedule loaded from localStorage');
      } catch (e) {
        console.error('Error parsing saved schedule:', e);
        loadFromApiOrGenerate();
      }
    } else {
      loadFromApiOrGenerate();
    }
  }, [loadFromApiOrGenerate]); // Thêm loadFromApiOrGenerate vào đây

  // Update the status of a lesson
  const updateStatus = (index, status) => {
    const newSchedule = [...schedule];
    
    // Calculate the actual index in the complete dataset
    const actualIndex = (currentPage - 1) * itemsPerPage + index;
    
    newSchedule[actualIndex].status = status;
    setSchedule(newSchedule);
    
    // Save to localStorage
    localStorage.setItem('ieltsSchedule', JSON.stringify(newSchedule));
  };

  // Add a clear schedule function
  const clearSchedule = () => {
    if(window.confirm("Bạn có chắc muốn xóa lịch học? Điều này sẽ giữ nguyên ngày bắt đầu ban đầu.")) {
      localStorage.removeItem('ieltsSchedule');
      const savedStartDate = localStorage.getItem('scheduleStartDate');
      const useStartDate = savedStartDate ? new Date(savedStartDate) : new Date();
      const newSchedule = generateSchedule(useStartDate);
      setSchedule(newSchedule);
      localStorage.setItem('ieltsSchedule', JSON.stringify(newSchedule));
      setCurrentPage(1);
    }
  };

  // Change start date function
  const changeStartDate = (newStartDate) => {
    setStartDate(newStartDate);
    localStorage.setItem('scheduleStartDate', newStartDate.toISOString());
    
    // Tạo lịch mới từ ngày bắt đầu mới
    const newSchedule = generateSchedule(newStartDate);
    setSchedule(newSchedule);
    localStorage.setItem('ieltsSchedule', JSON.stringify(newSchedule));
    setCurrentPage(1);
  };

  // Filter effect
  useEffect(() => {
    let result = [...schedule];
    
    // Better month filtering
    if (filters.month) {
      result = result.filter(item => {
        try {
          // Parse the date string to get the month name
          const dateObj = new Date(item.date);
          const monthName = dateObj.toLocaleString('en-US', { month: 'long' });
          return monthName === filters.month;
        } catch (e) {
          // Fallback to includes method if date parsing fails
          return item.date.includes(filters.month);
        }
      });
    }
    
    // Existing skill filter
    if (filters.skill) {
      result = result.filter(item => item.skill === filters.skill);
    }
    
    // Existing status filter
    if (filters.status) {
      result = result.filter(item => item.status === filters.status);
    }
    
    setFilteredSchedule(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [schedule, filters, loadFromApiOrGenerate]);

  // Handle filter change
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
  };

  // Change page
  const paginate = (pageNumber) => {
    // Ensure page number is within valid range
    const totalPages = Math.ceil(
      (filters.skill || filters.status ? filteredSchedule.length : schedule.length) / itemsPerPage
    );
    
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Update the getCurrentItems function
  const getCurrentItems = () => {
    // Check for ANY filter including month
    const currentItems = (filters.month || filters.skill || filters.status) 
      ? filteredSchedule 
      : schedule;
    
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    
    return currentItems.slice(indexOfFirstItem, indexOfLastItem);
  };

  // If not logged in, show login or register form
  if (!isLoggedIn) {
    if (showRegister) {
      return <Register 
        onRegisterSuccess={handleRegisterSuccess} 
        onBackToLogin={() => setShowRegister(false)} 
      />;
    }
    return <Login 
      onLogin={handleLogin} 
      onRegisterClick={() => setShowRegister(true)} 
    />;
  }

  // If logged in, show main application
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <header className="app-header">
        <div className="logo-container">
          <img 
            src={`${process.env.PUBLIC_URL}/Ilets_avatar.png`} 
            alt="IELTS Schedule" 
            className="logo" 
          />
          <h1>IELTS Study Schedule</h1>
        </div>
        <div className="header-actions">
          <div className="user-info">
            <span className="username">Xin chào, {userData?.username || 'Học viên'}</span>
            <button className="logout-button" onClick={handleLogout}>Đăng xuất</button>
          </div>
          <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
      </header>

      {/* Main content - existing code */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Đang tải lịch học của bạn...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">❌</div>
          <p>Lỗi: {error}</p>
          <button onClick={loadFromApiOrGenerate} className="retry-button">
            Thử lại
          </button>
        </div>
      ) : (
        <>
          <CurrentDateIndicator schedule={schedule} />
          <StatsDashboard schedule={schedule} />
          <ScheduleFilter onFilterChange={handleFilterChange} />
          <ScheduleTable 
            schedule={getCurrentItems()} 
            updateStatus={updateStatus} 
            highlightToday={true}
          />
          <Pagination 
            itemsPerPage={itemsPerPage} 
            totalItems={(filters.month || filters.skill || filters.status) ? filteredSchedule.length : schedule.length} 
            currentPage={currentPage} 
            paginate={paginate} 
          />
        </>
      )}
      
      <div className="button-container">
        <button 
          className="regenerate-button"
          onClick={() => {
            if (window.confirm('Bạn có chắc chắn muốn tạo lịch mới? Mọi tiến độ học tập hiện tại sẽ bị mất!')) {
              // Giữ ngày bắt đầu ban đầu khi tạo lại lịch
              const savedStartDate = localStorage.getItem('scheduleStartDate');
              const useStartDate = savedStartDate ? new Date(savedStartDate) : startDate;
              
              const newSchedule = generateSchedule(useStartDate);
              setSchedule(newSchedule);
              localStorage.setItem('ieltsSchedule', JSON.stringify(newSchedule));
              setCurrentPage(1);
            }
          }}
        >
          Regenerate Schedule
        </button>
        <button 
          className="clear-button"
          onClick={clearSchedule}
        >
          Clear & Reset Schedule
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default App;