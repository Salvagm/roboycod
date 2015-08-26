/**
 * Created by salva on 25/08/15.
 */
///<reference path="MotionBuffer.ts"/>
///<reference path="CoreBuffer.ts"/>
///<reference path="WeaponBuffer.ts"/>
///<reference path="DronBuffer.ts"/>

module IOSystem
{
    export class IOBuffer
    {
        public static sendMsg(msg : string, bufType : string)
        {
            switch (bufType)
            {
                case "motion":
                    IOSystem.MotionBuffer.getInstace().consoleOut(msg);
                    break;
                case "core":
                    IOSystem.CoreBuffer.getInstace().consoleOut(msg);
                    break;
                case "weapon":
                    IOSystem.WeaponBuffer.getInstace().consoleOut(msg);
                    break;
                case "dron":
                    IOSystem.DronBuffer.getInstace().consoleOut(msg);
                    break;
            }

        }
    }
}