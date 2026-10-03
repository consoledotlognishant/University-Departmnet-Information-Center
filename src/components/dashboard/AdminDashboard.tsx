import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Users,
  BookOpen,
  BookMarked,
  CalendarCheck,
  BellRing,
  Clock,
  ArrowUpRight,
  Plus,
  FileCheck2,
  FileBarChart2,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { StorageService } from '../../services/storageService';
import { NavItemKey } from '../common/Sidebar';
import { Notice, Student, Faculty } from '../../types';

interface AdminDashboardProps {
  onNavigate: (tab: NavItemKey) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [coursesCount, setCoursesCount] = useState(0);
  const [subjectsCount, setSubjectsCount] = useState(0);
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    setStudents(StorageService.getStudents());
    setFaculty(StorageService.getFaculty());
    setCoursesCount(StorageService.getCourses().length);
    setSubjectsCount(StorageService.getSubjects().length);
    setNotices(StorageService.getNotices());
  }, []);

  const totalStudents = students.length;
  const totalFaculty = faculty.length;
  const avgAttendance =
    totalStudents > 0
      ? Math.round(
          (students.reduce((acc, s) => acc + s.attendancePercentage, 0) / totalStudents) * 10
        ) / 10
      : 84.5;

  const lowAttendanceCount = students.filter((s) => s.attendancePercentage < 75).length;

  // Chart data: Attendance by Subject
  const attendanceData = [
    { subject: 'Data Structures', attendance: 88, threshold: 75 },
    { subject: 'DBMS', attendance: 83, threshold: 75 },
    { subject: 'Software Engg', attendance: 78, threshold: 75 },
    { subject: 'Operating Sys', attendance: 82, threshold: 75 },
    { subject: 'Computer Net.', attendance: 85, threshold: 75 },
  ];

  // Chart data: Performance Grade Distribution
  const gradeDistribution = [
    { name: 'O (Outstanding)', count: 2, color: '#1d4ed8' },
    { name: 'A+ (Excellent)', count: 3, color: '#2563eb' },
    { name: 'A (Very Good)', count: 2, color: '#3b82f6' },
    { name: 'B+ (Good)', count: 1, color: '#60a5fa' },
    { name: 'B / Below', count: 1, color: '#cbd5e1' },
  ];

  // Enrollment by Department
  const departmentEnrollment = [
    { dept: 'CSE (B.Tech)', enrolled: 480, capacity: 500 },
    { dept: 'ECE (B.Tech)', enrolled: 360, capacity: 400 },
    { dept: 'ME (B.Tech)', enrolled: 300, capacity: 350 },
    { dept: 'CSE (M.Tech)', enrolled: 45, capacity: 60 },
  ];

  const currentDateFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white rounded-xl border border-slate-200 shadow-2xs gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-700">
            <span>Academic Session 2026–2027</span>
            <span aria-hidden="true">·</span>
            <span>Autumn Term (Odd Semester)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-1">
            Welcome, Dr. Rajesh Mohanty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Head of Computer Science & Engineering · Department Control Console
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-xs text-slate-400 block font-medium">System Timestamp</span>
            <span className="text-xs font-semibold text-slate-700 font-mono tabular-nums">
              {currentDateFormatted}
            </span>
          </div>
          <button
            onClick={() => onNavigate('attendance')}
            className="px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors flex items-center gap-2 shrink-0"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Mark Daily Attendance</span>
          </button>
        </div>
      </div>

      {/* Quick Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Students */}
        <div
          onClick={() => onNavigate('students')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Students
            </span>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalStudents}
            </span>
            <span className="text-xs text-emerald-600 font-medium flex items-center">
              Active Roster
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>B.Tech CSE & ECE</span>
            <span className="text-blue-600 font-medium group-hover:underline">View All →</span>
          </div>
        </div>

        {/* Card 2: Faculty */}
        <div
          onClick={() => onNavigate('faculty')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Faculty
            </span>
            <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalFaculty}
            </span>
            <span className="text-xs text-slate-500 font-medium">Professors & Instructors</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>100% Assigned</span>
            <span className="text-blue-600 font-medium group-hover:underline">Manage →</span>
          </div>
        </div>

        {/* Card 3: Attendance Average */}
        <div
          onClick={() => onNavigate('attendance')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Avg Attendance
            </span>
            <div className="p-2 rounded-lg bg-amber-50 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {avgAttendance}%
            </span>
            {lowAttendanceCount > 0 ? (
              <span className="text-xs text-rose-600 font-medium flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> {lowAttendanceCount} Under 75%
              </span>
            ) : (
              <span className="text-xs text-emerald-600 font-medium">Above Threshold</span>
            )}
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>Minimum 75% Req.</span>
            <span className="text-blue-600 font-medium group-hover:underline">Audits →</span>
          </div>
        </div>

        {/* Card 4: Academic Courses & Subjects */}
        <div
          onClick={() => onNavigate('subjects')}
          className="p-5 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Courses & Subjects
            </span>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BookMarked className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {subjectsCount}
            </span>
            <span className="text-xs text-slate-500 font-medium">Across {coursesCount} Programs</span>
          </div>
          <div className="mt-2 text-xs text-slate-500 flex items-center justify-between">
            <span>Autumn 2026 CBCS</span>
            <span className="text-blue-600 font-medium group-hover:underline">Catalog →</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Attendance Overview by Subject (8 cols) */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Attendance Statistics by Subject</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Current semester average attendance vs. 75% statutory eligibility line
              </p>
            </div>
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              Detailed Log <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis
                  dataKey="subject"
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                />
                <YAxis
                  domain={[50, 100]}
                  tick={{ fontSize: 11, fill: '#64748b' }}
                  tickLine={false}
                  axisLine={{ stroke: '#e2e8f0' }}
                  unit="%"
                />
                <Tooltip
                  formatter={(val: any) => [`${val}%`, 'Average Attendance']}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                    border: 'none',
                  }}
                  itemStyle={{ color: '#93c5fd' }}
                />
                <Bar dataKey="attendance" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Academic Performance Distribution (4 cols) */}
        <div className="lg:col-span-4 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Grade Distribution</h3>
              <span className="text-xs text-slate-500">Internal Exam</span>
            </div>
            <p className="text-xs text-slate-500 mb-2">
              Performance breakdown across 5th semester evaluations
            </p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={gradeDistribution}
                    innerRadius={45}
                    outerRadius={65}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any, name: any) => [`${val} Students`, name]}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px',
                      border: 'none',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-slate-100">
            {gradeDistribution.map((g) => (
              <div key={g.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: g.color }} />
                  <span className="text-slate-600 truncate max-w-[130px]">{g.name}</span>
                </div>
                <span className="font-semibold text-slate-800 font-mono tabular-nums">
                  {g.count} students
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Program Capacity & Enrollment */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Department Enrollment vs. Sanctioned Capacity</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Seat intake utilization sanctioned by university academic senate
            </p>
          </div>
          <button
            onClick={() => onNavigate('departments')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            All Departments <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {departmentEnrollment.map((d) => {
            const pct = Math.round((d.enrolled / d.capacity) * 100);
            return (
              <div key={d.dept} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-800">{d.dept}</span>
                  <span className="font-mono text-slate-600 tabular-nums">{pct}%</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mb-2">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Enrolled: {d.enrolled}</span>
                  <span>Intake: {d.capacity}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Column Layout: Recent Notices & Quick Department Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Notices & Bulletins (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BellRing className="w-4 h-4 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">Important Notices & Circulars</h3>
            </div>
            <button
              onClick={() => onNavigate('notices')}
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              Manage Notices →
            </button>
          </div>

          <div className="divide-y divide-slate-100">
            {notices.slice(0, 3).map((notice) => (
              <div key={notice.id} className="py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-2 mb-1">
                  {notice.priority === 'urgent' && (
                    <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-sm border border-rose-200">
                      URGENT
                    </span>
                  )}
                  {notice.priority === 'high' && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-200">
                      HIGH
                    </span>
                  )}
                  <span className="text-xs text-slate-500 font-mono tabular-nums">{notice.postedDate}</span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs text-slate-500 truncate">{notice.postedBy}</span>
                </div>
                <h4 className="text-xs sm:text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors">
                  {notice.title}
                </h4>
                <p className="text-xs text-slate-600 line-clamp-2 mt-1 leading-relaxed">
                  {notice.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Administrative Shortcuts (5 cols) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">Quick Department Actions</h3>
            <p className="text-xs text-slate-500 mb-4">
              Frequent administrative procedures for the ongoing term
            </p>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('students')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-blue-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 group-hover:text-blue-700">
                      Register New Student
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Add student records with roll & batch details
                    </span>
                  </div>
                </div>
                <Plus className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
              </button>

              <button
                onClick={() => onNavigate('faculty')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 group-hover:text-emerald-700">
                      Faculty Subject Allocation
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Assign instructors to theoretical & lab subjects
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
              </button>

              <button
                onClick={() => onNavigate('marks')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-amber-400 hover:bg-amber-50/40 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-amber-100 text-amber-700 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 group-hover:text-amber-700">
                      Marks & Results Ledger
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Input internal, sessional & end-sem scores
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600" />
              </button>

              <button
                onClick={() => onNavigate('reports')}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50/40 text-left transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-md bg-purple-100 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                    <FileBarChart2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-xs font-semibold text-slate-900 group-hover:text-purple-700">
                      Generate Accreditation Audit
                    </span>
                    <span className="block text-[11px] text-slate-500">
                      Printable department statistical summaries
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
