var sync=require("q-sync")
var query=require("n-qr").query;
var modelName=require("./model");
var site_info_cache=undefined;
function SiteInfo(){}
SiteInfo.prototype.name={
    en:"",
    vn:""
};
SiteInfo.prototype.mobile="";
SiteInfo.prototype.address="";
SiteInfo.prototype.email = "";
SiteInfo.prototype.title = "";
SiteInfo.prototype.description = "";
SiteInfo.prototype.key_words = "";


/**
 * 
 * @param {*} db 
 * @param {SiteInfo}} data
 * @param {*} cb 
 */
function saveSiteInfo(db,data,cb){
    return sync(cb=>{
        var item=query(db,modelName)
            .project({ site:1})
            .replaceRoot("site")
            .item();
         if(item){
             var ret=query(db,modelName).set({
                 site:data
             }).commit();
             if(!ret.error){
                 site_info_cache = data;
                 cb(null, ret);
             }
             else {
                 cb(ret.error);
             }
            
            
         } 
         else {
             var ret=query(db,modelName).insert({
                 site:data
             }).commit();
             if (!ret.error) {
                 site_info_cache = data;
                 cb(null, ret);
             }
             else {
                 cb(ret.error);
             }

         }  

    }).call(cb)

}
function getSiteInfo(db,cb){
    if (site_info_cache){
        if(cb){
            cb(null, site_info_cache);
        }
        else {
            return site_info_cache;
        }
    }
    else {
        return sync(cb=>{
            var ret=query(db,modelName).project({
                site:1
            })
            .replaceRoot("site")
            .item();
            if(!ret){
                cb(null,{});
            }
            else {
                site_info_cache=ret;
                cb(null, site_info_cache);
            }
        }).call(cb);
    }
}
module.exports={
    saveSiteInfo: saveSiteInfo,
    getSiteInfo: getSiteInfo,
    SiteInfo: SiteInfo
}