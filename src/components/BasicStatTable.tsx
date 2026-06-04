import "../styles/App.css";
import { type RootState } from "../app/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../redux/hooks";
import { updateBaseStat } from "../redux/statsThunks";

import { baseStats } from "../app/types"
import { capitalFirst } from "../lib/util";

export default function BasicStatTable(){
    const dispatch = useAppDispatch()

    const stats = useSelector(
      (state: RootState) => state.stats
    )

    return (
        <table className="basic-stat-table">
            <tbody>
            {
                baseStats.map((stat) => (
                    <tr key={stat}>
                        <td>
                            <b>{capitalFirst(stat)}</b>
                        </td>
                        <td>
                            <input className="stat-input" type="number" value={stats.baseStats[stat]} onChange={(e) =>
                                dispatch(updateBaseStat(stat, Number(e.target.value)))
                            }/>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}