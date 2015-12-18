using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(PushSharpWeb.Startup))]
namespace PushSharpWeb
{
    public partial class Startup {
        public void Configuration(IAppBuilder app) {
            ConfigureAuth(app);
        }
    }
}
