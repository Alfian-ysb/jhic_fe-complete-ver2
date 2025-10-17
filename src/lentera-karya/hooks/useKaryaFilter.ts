import { useState, useMemo } from 'react';
import type { Karya } from '../types/karya';

/**
 * Custom hook for sorting and filtering karya list
 * Encapsulates all sort and filter logic
 */
export function useKaryaFilter(karyaList: Karya[]) {
    const [sortBy, setSortBy] = useState<string>("newest");
    const [filterStatus, setFilterStatus] = useState<string>("all");

    /**
     * Get sorted and filtered karya list
     * Memoized to prevent unnecessary recalculations
     */
    const filteredKarya = useMemo(() => {
        let result = [...karyaList];

        // 1. Filter by status
        if (filterStatus !== "all") {
            result = result.filter(karya => karya.status === filterStatus);
        }

        // 2. Sort by criteria
        switch (sortBy) {
            case "newest":
                result.sort((a, b) => 
                    new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
                );
                break;

            case "oldest":
                result.sort((a, b) => 
                    new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime()
                );
                break;

            case "approved":
                result.sort((a, b) => {
                    if (a.status === 'approved' && b.status !== 'approved') return -1;
                    if (a.status !== 'approved' && b.status === 'approved') return 1;
                    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
                });
                break;

            case "pending":
                result.sort((a, b) => {
                    if (a.status === 'pending' && b.status !== 'pending') return -1;
                    if (a.status !== 'pending' && b.status === 'pending') return 1;
                    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
                });
                break;

            case "rejected":
                result.sort((a, b) => {
                    if (a.status === 'rejected' && b.status !== 'rejected') return -1;
                    if (a.status !== 'rejected' && b.status === 'rejected') return 1;
                    return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
                });
                break;

            default:
                break;
        }

        return result;
    }, [karyaList, sortBy, filterStatus]);

    return {
        sortBy,
        filterStatus,
        filteredKarya,
        setSortBy,
        setFilterStatus,
    };
}
