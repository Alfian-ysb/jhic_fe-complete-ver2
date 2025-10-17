import { memo } from 'react';
import type { Karya } from '../../types/karya';

interface KaryaFilterSortProps {
    sortBy: string;
    filterStatus: string;
    onSortChange: (value: string) => void;
    onFilterChange: (value: string) => void;
    karyaList: Karya[];
    filteredCount: number;
}

/**
 * Filter and Sort Controls Component
 * Handles sorting and filtering of karya list
 */
const KaryaFilterSort = memo(({ 
    sortBy, 
    filterStatus, 
    onSortChange, 
    onFilterChange, 
    karyaList,
    filteredCount 
}: KaryaFilterSortProps) => {
    return (
        <div className="mb-6 bg-white rounded-lg shadow-md p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Sort By Dropdown */}
                <div>
                    <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700 mb-2">
                        Urutkan Berdasarkan:
                    </label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={(e) => onSortChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                        <option value="newest">📅 Terbaru</option>
                        <option value="oldest">📅 Terlama</option>
                        <option value="approved">✅ Approved Dulu</option>
                        <option value="pending">⏳ Pending Dulu</option>
                        <option value="rejected">❌ Rejected Dulu</option>
                    </select>
                </div>

                {/* Filter Status Dropdown */}
                <div>
                    <label htmlFor="filterStatus" className="block text-sm font-medium text-gray-700 mb-2">
                        Filter Status:
                    </label>
                    <select
                        id="filterStatus"
                        value={filterStatus}
                        onChange={(e) => onFilterChange(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                        <option value="all">🔍 Semua Status</option>
                        <option value="approved">✅ Approved</option>
                        <option value="pending">⏳ Pending</option>
                        <option value="rejected">❌ Rejected</option>
                    </select>
                </div>
            </div>

            {/* Stats Summary */}
            <StatsSection 
                karyaList={karyaList} 
                filteredCount={filteredCount} 
            />
        </div>
    );
});

KaryaFilterSort.displayName = 'KaryaFilterSort';

/**
 * Statistics Section Component
 * Shows count of each status and total
 */
const StatsSection = memo(({ karyaList, filteredCount }: { karyaList: Karya[]; filteredCount: number }) => {
    const stats = {
        total: karyaList.length,
        approved: karyaList.filter(k => k.status === 'approved').length,
        pending: karyaList.filter(k => k.status === 'pending').length,
        rejected: karyaList.filter(k => k.status === 'rejected').length,
    };

    return (
        <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm">
                <StatItem label="Total" value={stats.total} color="text-gray-600" />
                <StatItem label="Approved" value={stats.approved} color="text-green-600" />
                <StatItem label="Pending" value={stats.pending} color="text-yellow-600" />
                <StatItem label="Rejected" value={stats.rejected} color="text-red-600" />
                <StatItem label="Ditampilkan" value={filteredCount} color="text-blue-600" />
            </div>
        </div>
    );
});

StatsSection.displayName = 'StatsSection';

/**
 * Individual Stat Item Component
 */
const StatItem = memo(({ label, value, color }: { label: string; value: number; color: string }) => (
    <span className={color}>
        {label}: <strong>{value}</strong>
    </span>
));

StatItem.displayName = 'StatItem';

export default KaryaFilterSort;
