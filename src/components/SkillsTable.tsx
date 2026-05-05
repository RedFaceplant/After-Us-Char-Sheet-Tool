import "../styles/App.css";
import {type Stats, skillGroups} from "../app/types"
import { capitalFirst } from "../lib/util";


export default function SkillsTable({stats, setStats}: {stats: Stats, setStats: Function}){
    return(
        <table className="skills-table">
            <thead>
                <tr>
                {skillGroups.map((group, i) => (
                    <th
                    key={group.group}
                    className={i !== skillGroups.length - 1 ? "group-divider" : ""}
                    >
                        <div className="skill-cell">
                        <span>
                            {capitalFirst(group.group)}
                        </span>

                        <input
                            type="number"
                            value={stats.skillGroups[group.group] ?? ""}
                            onChange={(e) =>
                                setStats(
                                "skillGroups", group.group,
                                Number(e.target.value)
                                )
                            }
                            />
                            </div>
                    </th>
                ))}
                </tr>
            </thead>

            <tbody>
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                    {skillGroups.map((group, i) => {
                    const skill = group.skills[rowIndex];

                    return (
                        <td
                        key={skill.id}
                        className={i !== skillGroups.length - 1 ? "group-divider" : ""}
                        >
                        <div className="skill-cell">
                            <span>{skill.label}:</span>

                            <input
                            type="number"
                            value={stats.skills[skill.id] ?? ""}
                            onChange={(e) =>
                                setStats(
                                "skills", skill.id,
                                Number(e.target.value)
                                )
                            }
                            />
                        </div>
                        </td>
                    );
                    })}
                </tr>
                ))}
            </tbody>
        </table>
    )
}