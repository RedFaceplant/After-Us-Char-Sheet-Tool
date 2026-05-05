import "../styles/App.css";
import {type Stats} from "../app/types"
import { capitalFirst } from "../lib/util";

const baseStatKeys: (keyof Stats["baseStats"])[] = [
    "strength",
    "agility",
    "vigor",
    "reason",
    "instinct",
]

export default function BasicStatTable({stats, setStats}: {stats: Stats, setStats: Function}){
    return (
        <table className="basic-stat-table">
            <tbody>
            {
                baseStatKeys.map((stat) => (
                    <tr key={stat}>
                        <td>
                            <b>{capitalFirst(stat)}</b>
                        </td>
                        <td>
                            <input className="stat-input" type="number" value={stats.baseStats[stat]} onChange={(e) =>
                                setStats("baseStats", stat, Number(e.target.value))
                            }/>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}